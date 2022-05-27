import { Component, For } from "solid-js";
import createScrollPosition from "@solid-primitives/scroll";
import { remToPx } from "../../utils";

type ContentType = { astro: { headers: { slug: string; text: string; depth: number }[] } };

// HACK Magic number
const correctTop = (v: number) => v - 100;

const Progress: Component = ({ content }: { content: ContentType }) => {
    const position = createScrollPosition();
    console.log(content.astro.headers);

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
        const relative = Math.max(Math.min(progress / scrollHeight, 1), 0);
        return { relative, h };
    });

    return (
        <div class="p-8 relative">
            <div class="h-75vh w-16px relative flex flex-col items-center">
                <div class="w-100% rounded-full bg-white overflow-hidden" style={{ height: `${(scrollable / scrollHeight) * 100}%` }}>
                    <div class="w-100% h-100% bg-primary rounded-full" style={{ transform: transform() }} />
                </div>
                <div class="flex-1 b-dotted b-0 b-l-4 b-white"></div>
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
                                    <a
                                        href={`#${h.slug}`}
                                        classList={{ "font-400": true, "text-sm": h.depth > 1 }}
                                        textContent={h.text}
                                    ></a>
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
