function removeSlashes(path: string) {
	return path.split('/').filter(Boolean).join('/');
}

export { removeSlashes };
