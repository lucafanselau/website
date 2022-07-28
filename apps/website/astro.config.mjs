import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";

import react from "@astrojs/react";

// const OneLight = loadTheme("./assets/OneLight.json");
// const OneLight = JSON.parse(
//   fs.readFileSync(path.join(process.cwd(), "./assets/OneLight.json"), 'utf-8'),
// )

/** @type {import('rehype-pretty-code').Options} */
const codeOptions = {
    theme: {
        dark: "one-dark-pro",
        light: "min-light",
    },
};

// https://astro.build/config
export default defineConfig({
    vite: {
        ssr: {
            external: ["svgo"],
        },
    },
    markdown: {
        mode: "md",
        syntaxHighlight: false,
        rehypePlugins: [[rehypePrettyCode, codeOptions]],
        // remarkPlugins: ['remark-gfm', 'remark-smartypants', [rehypePrettyCode, codeOptions]],
    },
    integrations: [tailwind(), react(), solid()],
});
