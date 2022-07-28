const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
    darkMode: "class",
    theme: {
        spacing: {
            0: "0px",
            1: "8px",
            2: "12px",
            3: "16px",
            4: "24px",
            5: "32px",
            6: "48px",
            7: "56px",
            8: "64px",
        },
        extend: {
            boxShadow: {
                solid: "-8px 8px 0px rgba(43, 47, 59, 0.25)",
            },
            colors: {
                darker: "#24272F",
                // text in light
                dark: "#3E4251",
                grey: "#555B6E",
                green: "#89B0AE",
                "light-green": "#BEE3DB",
                "lighter-green": "#D4EDE7",
                "kinda-white": "#FAF9F9",
                yellow: "#FFD6BA",
                pink: "#F4BBD3",
                "dodger-blue": "#0496FF",
            },
            fontFamily: {
                sans: ["Inter", "Roboto Flex"], //, ...defaultTheme.fontFamily.sans]
                mono: ["Fira Mono"],
            },
            typography: ({ theme }) => ({
                raisin: {
                    css: {
                        "--tw-prose-body": theme("colors.dark"),
                        "--tw-prose-headings": theme("colors.dark"),
                        "--tw-prose-lead": theme("colors.dark"),
                        "--tw-prose-links": theme("colors.dark"),
                        "--tw-prose-bold": theme("colors.dark"),
                        "--tw-prose-counters": theme("colors.dark"),
                        "--tw-prose-bullets": theme("colors.dark"),
                        "--tw-prose-hr": theme("colors.dark"),
                        "--tw-prose-quotes": theme("colors.dark"),
                        "--tw-prose-quote-borders": theme("colors.dark"),
                        "--tw-prose-captions": theme("colors.dark"),
                        "--tw-prose-code": theme("colors.dark"),
                        "--tw-prose-pre-code": theme("colors.kinda-white"),
                        "--tw-prose-pre-bg": theme("colors.kinda-white"),
                        "--tw-prose-th-borders": theme("colors.dark"),
                        "--tw-prose-td-borders": theme("colors.dark"),
                        "--tw-prose-invert-body": theme("colors.kinda-white"),
                        "--tw-prose-invert-headings": theme("colors.white"),
                        "--tw-prose-invert-lead": theme("colors.kinda-white"),
                        "--tw-prose-invert-links": theme("colors.white"),
                        "--tw-prose-invert-bold": theme("colors.white"),
                        "--tw-prose-invert-counters": theme("colors.kinda-white"),
                        "--tw-prose-invert-bullets": theme("colors.kinda-white"),
                        "--tw-prose-invert-hr": theme("colors.kinda-white"),
                        "--tw-prose-invert-quotes": theme("colors.kinda-white"),
                        "--tw-prose-invert-quote-borders": theme("colors.kinda-white"),
                        "--tw-prose-invert-captions": theme("colors.kinda-white"),
                        "--tw-prose-invert-code": theme("colors.white"),
                        "--tw-prose-invert-pre-code": theme("colors.kinda-white"),
                        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders": theme("colors.kinda-white"),
                        "--tw-prose-invert-td-borders": theme("colors.kinda-white"),
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
