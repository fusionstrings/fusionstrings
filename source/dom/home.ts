import { Markdown } from '#custom-elements/markdown';

function main() {
	customElements.define(
		'fusionstrings-markdown',
		Markdown,
	);
}

export { main };
