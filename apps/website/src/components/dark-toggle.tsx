import { Component, createSignal, onMount } from "solid-js";
import { Motion } from "@motionone/solid";
import sun from "../icons/sun.svg";
import moon from "../icons/moon.svg";

type ThemeType = "dark" | "light";
const THEME_DARK: ThemeType = "dark";
const THEME_LIGHT: ThemeType = "light";

const width = 54;
const widthClass = "w-[54px]";

export const DarkToggle: Component = () => {
    const [theme, setTheme] = createSignal<ThemeType>("dark");

    const toggleTheme = () => {
        window.document.body.classList.toggle(THEME_DARK);
        const currTheme = localStorage.getItem("theme") === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        // Update Storage
        localStorage.setItem("theme", currTheme);
        // Update Store
        setTheme(currTheme);
    };
    onMount(() => {
        let currTheme: ThemeType;
        if (
            localStorage.getItem("theme") === THEME_DARK ||
            (!("theme" in localStorage) && window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).matches)
        ) {
            window.document.body.classList.add(THEME_DARK);
            currTheme = THEME_DARK;
        } else {
            window.document.body.classList.remove(THEME_DARK);
            currTheme = THEME_LIGHT;
        }
        // Update Store
        setTheme(currTheme);
    });
    return (
        <button
            onClick={toggleTheme}
            class={"rounded-full box-content border-2 border-dark dark:border-kinda-white relative " + widthClass + " h-[28px]"}
        >
            <Motion.img
                src={sun}
                class="absolute left-[6px] top-[6px] w-[16px] h-[16px]"
                animate={{ opacity: theme() === "light" ? 1 : 0 }}
                initial={false}
            />
            <Motion.img
                src={moon}
                class="absolute right-[6px] top-[6px] w-[16px] h-[16px]"
                animate={{ opacity: theme() === "dark" ? 1 : 0 }}
                initial={false}
            />
            <Motion.svg
                class="absolute top-[4px] text-dark dark:text-kinda-white"
                animate={{ rotate: theme() === "dark" ? "90deg" : "0deg", x: theme() === "dark" ? 4 : width - 4 - 20 }}
                width="20"
                height="20"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.78028 26.7127L5.07529 29.0077C8.01464 31.4354 11.784 32.894 15.894 32.894C25.2829 32.894 32.894 25.2828 32.894 15.894C32.894 8.63409 28.3433 2.43712 21.9387 0L9.15527e-05 21.9387C0.665123 23.6863 1.61012 25.2959 2.78028 26.7127Z"
                    class="fill-dark dark:fill-kinda-white"
                />
            </Motion.svg>
        </button>
    );
};
