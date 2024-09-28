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
if ((import.meta.url === ("file:///" + process.argv[1].replace(/\\/g, "/")).replace(/\/{3,}/, "///"))) {
    customElements.define('fusionstrings-markdown', Markdown);
}

export { Markdown };
//# sourceMappingURL=markdown.js.map
