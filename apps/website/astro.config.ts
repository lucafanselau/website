import { defineConfig } from "astro/config";
import uno from "uno-astro";
import solid from "@astrojs/solid-js";
const unoIntegration = uno("uno.config.ts");

// https://astro.build/config
export default defineConfig({
    integrations: [unoIntegration, solid()],
    markdown: {
        shikiConfig: {
            theme: "one-dark-pro",
        },
    },
});
