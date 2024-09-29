import type { ComrakOptions } from "#comark";

const MARKDOWN_OPTIONS: ComrakOptions = {
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
    render: { unsafe: true }
};

class Markdown extends HTMLElement {
    static get observedAttributes() {
        return ['src'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("fusionstrings-markdown connected 📝");
    }

    attributeChangedCallback(name: string, oldValue: string | undefined, newValue: string | undefined) {
        if (name === 'src' && newValue && newValue !== oldValue) {
            this.updateContent();
        }
    }

    updateContent() {
        const src = this.getAttribute('src');
        if (src) {
            fetch(src)
                .then((response) => response.text())
                .then((markdown) => {
                    import("#comark").then((comrak) => {
                        comrak.init().then(() => {
                            const html = comrak.markdownToHTML(markdown, MARKDOWN_OPTIONS)
                            this.innerHTML = html
                        })
                    })
                });
        }
    }
}

export { Markdown }

if (import.meta.main) {
    customElements.define('fusionstrings-markdown', Markdown);
}