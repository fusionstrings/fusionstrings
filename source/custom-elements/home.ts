import * as comrak from "https://deno.land/x/comrak@0.1.1/mod.ts";

await comrak.init();

const MARKDOWN_OPTIONS: comrak.ComrakOptions = {
    extension: {
        autolink: true,
        descriptionLists: true,
        strikethrough: true,
        superscript: true,
        table: true,
        tagfilter: true,
    },
};

let HTMLElement;

if (globalThis.HTMLElement) {
    HTMLElement = globalThis.HTMLElement;
  } else {
    const { parseHTML } = await import("linkedom");
    const { HTMLElement: LinkedOMHTMLElement } = parseHTML('<div></div>');
    HTMLElement = LinkedOMHTMLElement;
  }

class Home extends HTMLElement {
    async connectedCallback() {
        console.log('Home Connected')
        await this.fetchAndRenderMarkdown();
    }

    async fetchAndRenderMarkdown() {
        try {
            const markdownURL = new URL("../docs/home.md", import.meta.url)
                .toString();
            const response = await fetch(markdownURL);

            const markdownContent = await response.text();
            const markup = this.convertMarkdownToHTML(markdownContent)
            this.innerHTML = markup;
        } catch (error) {
            console.error('Error fetching or rendering Markdown:', error);
        }
    }

    convertMarkdownToHTML(markdown: string) {
        const markup = comrak.markdownToHTML(markdown, MARKDOWN_OPTIONS)
        return markup;
    }
}

export { Home }