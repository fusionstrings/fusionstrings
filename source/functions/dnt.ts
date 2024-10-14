import { build, emptyDir } from '@deno/dnt';

await emptyDir('./source/generated');

await build({
	entryPoints: ['source/dom/home.ts', 'source/custom-elements/markdown.ts'],
	outDir: './source/generated',
	shims: {
		// see JS docs for overview and more options
		deno: true,
	},
	scriptModule: false,
	esModule: true,
	skipSourceOutput: false,
	importMap: 'deno.json',
	compilerOptions: {
		lib: ['ESNext', 'DOM'],
		target: 'Latest',
	},
	package: {
		// package.json properties
		name: '@fusionstrings/www',
		version: Deno.args[0],
		description: 'fusionstrings website dom',
		repository: {
			type: 'git',
			url: 'git+https://github.com/fusionstrings/fusionstrings.github.io.git',
		},
	},
	postBuild() {
		console.log('done');
		// steps to run after building and before running the tests
		// Deno.copyFileSync("LICENSE", "npm/LICENSE");
		// Deno.copyFileSync("README.md", "npm/README.md");
	},
});
