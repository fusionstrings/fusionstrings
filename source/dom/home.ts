import { Markdown } from "#markdown";

function main() {

    customElements.define(
        "fusionstrings-markdown",
        Markdown,
    );
}

export { main }