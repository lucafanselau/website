import { Component, For } from "solid-js";
import createScrollPosition from "@solid-primitives/scroll";
import { remToPx } from "../../utils";

type ContentType = { astro: { headers: { slug: string; text: string }[] } };

// HACK Magic number
const correctTop = (v: number) => v - 100;

const Progress: Component = ({ content }: { content: ContentType }) => {
    const position = createScrollPosition();

    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollable = scrollHeight - clientHeight;
    const transform = () => {
        return `translateY(-${100 - (position() / scrollable) * 100}%`;
    };

    const elements = content.astro.headers.map(h => ({
        e: document.querySelector("#" + h.slug),
        h,
    }));
    // the cool thing here is that we run the getBoundingClientRect only once per default
    const tops = elements.map(({ e, h }) => {
        /* const style = getComputedStyle(e);
         * const marginTop = style.marginTop.endsWith("px") ? parseInt(style.marginTop) || 0 : 0; */

        const { top } = e?.getBoundingClientRect();
        // add the initial scroll position
        const progress = correctTop(top + position());
        const relative = Math.max(Math.min(progress / scrollable, 1), 0);
        return { relative, h };
    });

    return (
        <div class="p-8 relative">
            <div class="h-75vh w-16px relative">
                <div class="w-100% h-100% rounded-full bg-white overflow-hidden">
                    <div class="w-100% h-100% bg-primary rounded-full" style={{ transform: transform() }} />
                </div>
                <For each={tops}>
                    {({ relative, h }) => (
                        <div
                            id={`${h.slug}-positioner`}
                            class="absolute left-8px"
                            style={{ top: `clamp(8px, ${relative * 100}%, calc(100% - 8px))` }}
                        >
                            <div class="relative">
                                <div class="w-12px h-12px bg-light-primary rounded-full translate--50%" />
                                <div
                                    id={`${h.slug}-link-positioner`}
                                    class="absolute right-32px top-0px translate-y--50% min-w-200px text-end"
                                >
                                    <a href={`#${h.slug}`} textContent={h.text}></a>
                                </div>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default Progress;
