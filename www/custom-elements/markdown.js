const MARKDOWN_OPTIONS = {
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
};
class Markdown extends HTMLElement {
    static get observedAttributes() {
        return ['src'];
    }
    constructor() {
        super();
    }
    connectedCallback() {
        console.log('fusionstrings-markdown connected 📝');
    }
    attributeChangedCallback(name, oldValue, newValue) {
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
                import('../mod-D3z-qOzY.js').then((comrak) => {
                    comrak.init().then(() => {
                        const html = comrak.markdownToHTML(markdown, MARKDOWN_OPTIONS);
                        this.innerHTML = html;
                    });
                });
            });
        }
    }
}

export { Markdown };
//# sourceMappingURL=markdown.js.map
