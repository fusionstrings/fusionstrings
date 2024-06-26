import { onListen } from "#on-listen";

if (import.meta?.main) {
  Deno.serve({
    onListen,
  }, (request: Request, connection: Deno.ServeHandlerInfo) => {
    // Get information about the incoming request
    const method = request.method;
    const ip = connection.remoteAddr.hostname;
    console.log(`${ip} just made an HTTP ${method} request.`);

    // Return a web standard Response object
    return new Response("Hello, world!");
  });
}