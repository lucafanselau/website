/** @jsxImportSource solid-js */

import { Component, Show } from "solid-js";
import moonSource from "../icons/moon.svg";
import sunSource from "../icons/sun.svg";

type ThemeType = "dark" | "light";
const THEME_DARK: ThemeType = "dark";
const THEME_LIGHT: ThemeType = "light";

const width = 54;
const widthClass = "w-[54px]";

const state = {
    sun: {
        light: {
            opacity: 1,
        },
        dark: {
            opacity: 0,
        },
    },
    moon: {
        light: {
            opacity: 0,
        },
        dark: {
            opacity: 1,
        },
    },
    handle: {
        light: {
            rotate: "0deg",
            translate: width - 24 + "px",
        },
        dark: {
            rotate: "90deg",
            translate: "4px",
        },
    },
} as const;

const delay = 150;
const total = 350;
const options = {
    sun: {
        light: {
            duration: total - delay,
            delay,
        },
        dark: {
            duration: total - delay,
        },
    },
    moon: {
        light: {
            duration: total - delay,
        },
        dark: {
            duration: total - delay,
            delay,
        },
    },
    handle: {
        light: {
            duration: total,
        },
        dark: {
            duration: total,
        },
    },
};

const fromStorage = () => localStorage.getItem("theme") as ThemeType;
const getInitial = () => {
    const storage = fromStorage();
    if (storage === undefined) {
        // check for initial value
        if (typeof window !== "undefined" && window?.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`)?.matches) return THEME_DARK;
        else return THEME_LIGHT;
    } else {
        return storage;
    }
};

const names = ["sun", "moon", "handle"] as const;

export const DarkToggle: Component = () => {
    const initial = getInitial();
    localStorage.setItem("theme", initial);

    let el = {
        sun: undefined as HTMLImageElement | undefined,
        moon: undefined as HTMLImageElement | undefined,
        handle: undefined as SVGSVGElement | undefined,
    };
    const toggleTheme = () => {
        window.document.documentElement.classList.toggle(THEME_DARK);
        const old = fromStorage();
        const toggled = old === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        // Update Storage
        localStorage.setItem("theme", toggled);
        // Animation
        names.forEach(name => {
            const e = el[name];
            const s = state[name];
            if (e !== undefined)
                e.animate([s[old], s[toggled]], { fill: "forwards", easing: "ease-in-out", ...(options[name]?.[toggled] ?? {}) });
        });
    };
    return (
        <button
            onClick={toggleTheme}
            class={"rounded-full box-content border-2 border-dark dark:border-kinda-white relative " + widthClass + " h-[28px]"}
        >
            <Show when={typeof window !== "undefined"}>
                <img style={state["sun"][initial]} ref={el.sun} src={sunSource} class="absolute left-[6px] top-[6px] w-[16px] h-[16px]" />
                <img
                    style={state["moon"][initial]}
                    ref={el.moon}
                    src={moonSource}
                    class="absolute right-[6px] top-[6px] w-[16px] h-[16px]"
                />
                <svg
                    ref={el.handle}
                    class="absolute top-[4px] text-dark dark:text-kinda-white"
                    style={state["handle"][initial]}
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
                </svg>
            </Show>
        </button>
    );
};
