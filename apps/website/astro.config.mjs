import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";



const codeOptions = {
  theme: {
    dark: "one-dark-pro",
    light: "min-light"
  }
};


// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  site: "https://guythat.codes",
  markdown: {
    mode: "md",
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, codeOptions]] // remarkPlugins: ['remark-gfm', 'remark-smartypants', [rehypePrettyCode, codeOptions]],

  },
  integrations: [tailwind(), react(), solid(), sitemap()]
});
