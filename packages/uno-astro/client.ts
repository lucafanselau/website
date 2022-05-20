import type { UpdatePayload } from "vite";

const updateTag = (revision: string) => {
    const el = document.querySelector<HTMLLinkElement>("link[href*=__uno\\.css]");
    if (el) {
        const url = new URL(el.href);
        url.searchParams.set("t", revision);
        el.href = url.href;
    }
};

const regex = /\/__uno\.css/gm;
import.meta.hot?.on("vite:beforeUpdate", (events: UpdatePayload) => {
    const found = events.updates.find(({ path }) => regex.test(path));
    if (found !== undefined) {
        setTimeout(() => {
            updateTag(found.timestamp.toString());
        }, 500);
    }
});
