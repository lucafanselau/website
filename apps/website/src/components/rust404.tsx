import { Component, createSignal, JSX, onMount } from "solid-js";
import init, { Game } from "rust-404";
import { DocumentEventListener, DocumentEventProps } from "@solid-primitives/event-listener";

export const Rust404: Component = () => {
    let canvas: HTMLCanvasElement;
    let game: Game;
    let startup: number;
    let running = false;

    const renderLoop = (last: number) => {
        const now = window.performance.now();
        game.update((now - last) / 1000.0, now / 1000.0);
        game.render();
        if (running) requestAnimationFrame(() => renderLoop(now));
    };
    const onClick: JSX.DOMAttributes<HTMLCanvasElement>["onClick"] = async event => {
        if (game === undefined) {
            // initialize the whole shit
            await init();
            game = await Game.new();
            // initialize the
            startup = window.performance.now();
        }

        if (!running) {
            running = true;
            canvas.requestPointerLock();
            // kickstart the render loop
            renderLoop(startup);
        }
    };

    const lockChange: DocumentEventProps["onPointerlockchange"] = e => {
        if (document.pointerLockElement === canvas) {
            // that should be the action that we dispatched ourselves
        } else {
            running = false;
        }
    };

    return (
        <div
            class={
                "border-[3px] border-darker dark:border-kinda-white " +
                "shadow-solid shadow-darker/25 dark:shadow-kinda-white/25 " +
                "inline-block rounded-2xl dark:from-yellow dark:to-dark from-green to-yellow bg-gradient-to-l overflow-hidden"
            }
        >
            <canvas ref={canvas} id={"canvas"} width={600} height={400} onClick={onClick} />
            <DocumentEventListener onPointerlockchange={lockChange} />
        </div>
    );
};
