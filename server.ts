import { requestHandler } from '@fusionstrings/www/request-handler';
import { onListen } from '#on-listen';

const PORT = Deno.env.get('PORT');

const serverOptions = {
	onListen,
	port: PORT ? parseInt(PORT, 10) : 1729,
};

if (import.meta?.main) {
	Deno.serve(serverOptions, requestHandler);
}
