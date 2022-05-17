import { defineConfig } from 'astro/config'
import uno from './uno'
import { presetUno, presetTypography, presetWebFonts } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import ion from '@iconify-json/ion/icons.json'

// https://astro.build/config
export default defineConfig({
    integrations: [
        uno({
            theme: {
                colors: {
                    background: '#555B6E',
                    primary: '#89B0AE',
                    lightPrimary: '#BEE3DB',
                    text: '#FAF9F9',
                    secondary: '#FFD6BA',
                },
            },
            presets: [
                presetIcons({
                    collections: {
                        ion,
                    },
                }),
                presetUno(),
                presetWebFonts({
                    provider: 'google',
                    fonts: {
                        sans: 'Roboto Flex',
                        mono: 'Fira Code',
                    },
                }),
                presetTypography(),
            ],
        }),
    ],
})
