import { default as initWASM, markdown_to_html as markdownToHTMLWASM, } from "./pkg/comrak_wasm.js";
import { source } from "./wasm.js";
let inited;
export async function init() {
    if (inited !== undefined) {
        await inited;
    }
    inited = initWASM(source)
        .then(() => true);
    await inited;
    inited = true;
}
/**
 * Render Markdown to HTML.
 */
export function markdownToHTML(markdown, options = {}) {
    const opts = {
        // deno-lint-ignore camelcase
        extension_autolink: options.extension?.autolink ?? false,
        // deno-lint-ignore camelcase
        extension_description_lists: options.extension?.descriptionLists ?? false,
        // deno-lint-ignore camelcase
        extension_footnotes: options.extension?.footnotes ?? false,
        // deno-lint-ignore camelcase
        extension_front_matter_delimiter: options.extension?.frontMatterDelimiter ??
            null,
        // deno-lint-ignore camelcase
        extension_header_ids: options.extension?.headerIDs ?? null,
        // deno-lint-ignore camelcase
        extension_strikethrough: options.extension?.strikethrough ?? false,
        // deno-lint-ignore camelcase
        extension_superscript: options.extension?.superscript ?? false,
        // deno-lint-ignore camelcase
        extension_table: options.extension?.table ?? false,
        // deno-lint-ignore camelcase
        extension_tagfilter: options.extension?.tagfilter ?? false,
        // deno-lint-ignore camelcase
        extension_tasklist: options.extension?.tasklist ?? false,
        // deno-lint-ignore camelcase
        parse_default_into_string: options.parse?.defaultInfoString ?? null,
        // deno-lint-ignore camelcase
        parse_smart: options.parse?.smart ?? false,
        // deno-lint-ignore camelcase
        render_escape: options.render?.escape ?? false,
        // deno-lint-ignore camelcase
        render_github_pre_lang: options.render?.githubPreLang ?? false,
        // deno-lint-ignore camelcase
        render_hardbreaks: options.render?.hardbreaks ?? false,
        // deno-lint-ignore camelcase
        render_unsafe: options.render?.unsafe ?? false,
        // deno-lint-ignore camelcase
        render_width: options.render?.width ?? 0,
    };
    return markdownToHTMLWASM(markdown, opts);
}
