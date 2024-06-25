import { parseHTML } from "linkedom";
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

async function requestHandlerHTTP() {
  try {
    const templateURL = new URL("./templates/page.html", import.meta.url)
      .toString();
    const template = await fetch(templateURL);
    const html = await template.text();
    const { document, customElements, HTMLElement } = parseHTML(html);

    customElements.define(
      "fusionstrings-1729",
      class extends HTMLElement {
        connectedCallback() {
          console.log("fusionstrings-1729 connected 🥳");
        }
      },
    );

    const markdownURL = new URL("./docs/home.md", import.meta.url)
      .toString();
    const response = await fetch(markdownURL);

    const markdown = await response.text();


    const element1729 = document.createElement("fusionstrings-1729");
    element1729.innerHTML = comrak.markdownToHTML(markdown, MARKDOWN_OPTIONS);

    const mainElement = document.querySelector("main");

    if (mainElement) {
      mainElement.appendChild(element1729);
    }

    const importmapElement = document.querySelector('script[type="importmap"]');

    if (importmapElement) {
      const importmap = await Deno.readTextFile("./www/browser.importmap");
      importmapElement.innerHTML = importmap;
    }

    return new Response(document.toString(), {
      headers: { "content-type": "text/html" },
    });
  } catch (error) {
    console.error(error.message || error.toString());

    return new Response('404', {
      headers: { "content-type": "text/html" },
    });
  }
}

export { requestHandlerHTTP };
