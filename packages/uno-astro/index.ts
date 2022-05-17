import unoVite from 'unocss/vite'
import type { AstroIntegration } from 'astro'

// we take the same arguments as the uno integration
const uno = (...args: Parameters<typeof unoVite>): AstroIntegration => ({
    name: 'unocss',

    hooks: {
        'astro:config:setup': ({ updateConfig, injectScript }) => {
            // first register as a vite plugin
            updateConfig({
                vite: {
                    plugins: [unoVite(...args)],
                },
            })
            // and we also want to inject an import script here
            // NOTE: page ssr is used by the tailwind integration so i guess this is best practice, but the website
            // refers to this as "not commonly used", maybe "page" is the preferred option
            injectScript(
                'page-ssr',
                'import "virtual:uno.css";\nimport "@unocss/reset/normalize.css";'
            )
        },
    },
})

export default uno
