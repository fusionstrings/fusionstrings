import { serveFile } from "@std/http";
import browserImportmap from '#browser-importmap' with { type: 'json' };
import serverImportmap from '#server-importmap' with { type: 'json' };

type BrowserAssets = keyof typeof browserImportmap['imports'];
type ServerAssets = keyof typeof serverImportmap['imports'];

async function notFound() {
    const templateURL = new URL('./templates/404.html', import.meta.url).toString();
    const notFound = await fetch(templateURL);

    return new Response(notFound.body, { status: 404 });
}

async function requestHandler(request: Request): Promise<Response> {
    try {
        const { pathname } = new URL(request.url);

        const pathnameHandlerID = pathname.replace('/', '#');
        const pathnameHandler = pathnameHandlerID === '#' ? "#home" : pathnameHandlerID;

        if (pathnameHandler in browserImportmap.imports) {
            const resourcePath = browserImportmap.imports[pathnameHandler as BrowserAssets]

            if (resourcePath.startsWith('./')) {
                return serveFile(request, resourcePath)
            }

            return fetch(resourcePath)
        }

        const serverPath = pathnameHandler.replace('#', './')

        if (serverPath in serverImportmap.exports) {
            const resourcePath = serverImportmap.exports[serverPath as ServerAssets]
            const resourceURL = new URL(resourcePath, import.meta.url)
            const { requestHandlerHTTP } = await import(resourceURL.toString());
            return requestHandlerHTTP(request);
        }
        return notFound()
    } catch (error) {
        console.error(error.message || error.toString());

        return notFound()
    }
}

export { requestHandler }


export default {
    fetch: requestHandler
}