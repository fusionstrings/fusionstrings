function onListen({ port, hostname }: Deno.NetAddr) {
	try {
		console.log(`Server started at http://${hostname}:${port}`);
	} catch (error: unknown) {
		console.error((error as Error).message || (error as Error).toString());
		throw error;
	}
}

export { onListen };
