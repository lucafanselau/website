import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import { loadTheme } from "shiki";
import path from "path";

import react from "@astrojs/react";

// const OneLight = loadTheme("./assets/OneLight.json");
const OneLight = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "./assets/OneLight.json"), 'utf-8'),
)

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: ['remark-gfm', 'remark-smartypants', [remarkShikiTwoslash.default, { themes: ['one-dark-pro', OneLight] }]],
  },
  integrations: [tailwind(), react(), solid()]
});
