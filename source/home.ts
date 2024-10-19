import { parseHTML } from 'linkedom';
import * as comrak from '#comark';

import { notFound } from '#404';

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

		await Promise.all(
			Array.from(markdownElements).map(async (markdownElement) => {
				const src = markdownElement.getAttribute('src');

				if (src) {
					const markdownURL = new URL(`./${src}`, import.meta.url)
						.toString();
					const markdownResponse = await fetch(markdownURL);
					const markdown = await markdownResponse.text();

					const html = comrak.markdownToHTML(
						markdown,
						MARKDOWN_OPTIONS,
					);
					markdownElement.innerHTML = html;
				}
			}),
		);

		const response = document.toString();

		return new Response(response, {
			headers: { 'content-type': 'text/html' },
		});
	} catch (error: unknown) {
		console.error((error as Error).message || (error as Error).toString());

		return notFound();
	}
}

export { requestHandlerHTTP };
