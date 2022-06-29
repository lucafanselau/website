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
    rules: [
        [
            "gradient-p",
            {
                "background-image": "linear-gradient(90deg, #FFD6BA 0%, #BEE3DB 72.47%)",
                "background-clip": "text",
                "text-fill-color": "transparent",
                "-webkit-background-clip": "text",
                "-webkit-text-fill-color": "transparent",
            },
        ],
    ],
    transformers: [transformerDirective()],
});
