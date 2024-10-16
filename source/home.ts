import { parseHTML } from 'linkedom';
import * as comrak from '#comark';

await comrak.init();

const MARKDOWN_OPTIONS: comrak.ComrakOptions = {
	extension: {
		autolink: true,
		footnotes: true,
		descriptionLists: true,
		strikethrough: true,
		superscript: true,
		table: true,
		tagfilter: true,
	},
	parse: { smart: true },
	render: { unsafe: true },
};

async function requestHandlerHTTP(): Promise<Response> {
	try {
		const templateURL = new URL('./templates/page.html', import.meta.url)
			.toString();

		const template = fetch(templateURL);

		const { document } = parseHTML(await (await template).text());

		const markdownElements = document.querySelectorAll(
			'fusionstrings-markdown',
		);

		await Promise.all(markdownElements.map(async (markdownElement) => {
			const src = markdownElement.getAttribute('src');

			if (src) {
				const markdownURL = new URL(`./${src}`, import.meta.url)
					.toString();
				const markdownResponse = await fetch(markdownURL);
				const markdown = await markdownResponse.text();

				const html = await comrak.markdownToHTML(
					markdown,
					MARKDOWN_OPTIONS,
				);
				markdownElement.innerHTML = html;
			}
		}));

		const response = document.toString();

		return new Response(response, {
			headers: { 'content-type': 'text/html' },
		});
	} catch (error) {
		console.error(error.message || error.toString());

		return new Response('404', {
			headers: { 'content-type': 'text/html' },
		});
	}
}

export { requestHandlerHTTP };
