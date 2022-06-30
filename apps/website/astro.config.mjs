import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import solid from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  integrations: [tailwind(), solid()]
});