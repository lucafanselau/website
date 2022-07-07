import { Component, createSignal, JSX, onMount } from "solid-js";
import init, { Game } from "rust-404";

export const Rust404: Component = () => {
    let inited = false;
    const onClick: JSX.DOMAttributes<HTMLCanvasElement>["onClick"] = async event => {
        if (inited) return;
        const canvas = event.currentTarget;
        canvas.requestPointerLock();
        // init wasm runtime
        await init();
        const g = await Game.new();

        const startup = window.performance.now();
        const renderLoop = (last: number) => {
            const now = window.performance.now();
            g.update((now - last) / 1000.0, now / 1000.0);
            g.render();
            requestAnimationFrame(() => renderLoop(now));
        };
        // kickstart the render loop
        inited = true;
        renderLoop(startup);
    };

    return (
        <div
            class={
                "inline-block rounded-xl border-[3px] border-darker dark:border-kinda-white rounded-2xl shadow-solid shadow-darker/25 dark:shadow-kinda-white/25 from-green to-yellow bg-gradient-to-l overflow-hidden"
            }
        >
            <canvas id={"canvas"} width={600} height={400} onClick={onClick} />
        </div>
    );
};
