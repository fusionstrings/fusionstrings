import { serveFile } from '@std/http';

import { notFound } from '#404';

import browserImportmap from '#browser-importmap' with { type: 'json' };
import serverImportmap from '#server-importmap' with { type: 'json' };

type BrowserAssets = keyof typeof browserImportmap['imports'];

async function requestHandler(request: Request): Promise<Response> {
	try {
		const { pathname } = new URL(request.url);

		const pathnameHandlerID = pathname.replace('/', '#');
		const pathnameHandler = pathnameHandlerID === '#'
			? '#home'
			: pathnameHandlerID;

		if (pathnameHandler in browserImportmap.imports) {
			const resourcePath =
				browserImportmap.imports[pathnameHandler as BrowserAssets];

			if (resourcePath.startsWith('./')) {
				return serveFile(request, resourcePath);
			}

			return fetch(resourcePath);
		}

		const requestHandler = pathnameHandler.replace(
			'#',
			`${serverImportmap.name}/`,
		);
		const { requestHandlerHTTP } = await import(requestHandler);
		return requestHandlerHTTP(request);
	} catch (error: unknown) {
		console.error((error as Error).message || (error as Error).toString());

		return notFound();
	}
}

export { requestHandler };

export default {
	fetch: requestHandler,
} satisfies Deno.ServeDefaultExport;
