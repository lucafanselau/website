import unoVite from "unocss/vite";
import type { AstroIntegration } from "astro";

// we take the same arguments as the uno integration
const uno = (...args: Parameters<typeof unoVite>): AstroIntegration => ({
    name: "unocss",
    hooks: {
        "astro:config:setup": ({ updateConfig, injectScript }) => {
            const unocssPlugins = unoVite(...args);
            unocssPlugins.find(plugin => plugin.name === "unocss:global:build:generate").apply = (options, { command }) => {
                return command === "build" && !!options.build?.ssr;
            };
            // first register as a vite plugin
            updateConfig({
                vite: {
                    resolve: {
                        alias: {
                            "unocss-hmr-fix": "uno.css",
                        },
                    },
                    plugins: [unocssPlugins],
                },
            });
            // and we also want to inject an import script here
            // NOTE: page ssr is used by the tailwind integration so i guess this is best practice, but the website
            // refers to this as "not commonly used", maybe "page" is the preferred option
            // injectScript("page-ssr", 'import "virtual:uno.css";\nimport "@unocss/reset/tailwind.css";\n');
            // injectScript("page", 'import "uno-astro/client.ts";');
        },
    },
});

export default uno;
