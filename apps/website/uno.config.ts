import { defineConfig } from "unocss";
import { presetUno, presetTypography, presetWebFonts } from "unocss";
import presetIcons from "@unocss/preset-icons";
import ion from "@iconify-json/ion/icons.json";

import transformerDirective from "@unocss/transformer-directives";

export default defineConfig({
    theme: {
        colors: {
            background: "#24272F",
            lightBackground: "#3E4251",
            grey: "#555B6E",
            primary: "#89B0AE",
            lightPrimary: "#BEE3DB",
            text: "#FAF9F9",
            secondary: "#FFD6BA",
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
            provider: "google",
            fonts: {
                sans: ["Roboto:100,300,400,600,800,900"],

                mono: "Fira Code",
            },
        }),
        presetTypography(),
    ],
    transformers: [transformerDirective()],
});
