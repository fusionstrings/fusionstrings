declare class Markdown extends HTMLElement {
    static get observedAttributes(): string[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | undefined, newValue: string | undefined): void;
    updateContent(): void;
}
export { Markdown };
//# sourceMappingURL=markdown.d.ts.map