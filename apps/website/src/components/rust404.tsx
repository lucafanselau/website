import { Component, createSignal, JSX, onMount } from "solid-js";
import init, { Game } from "rust-404";
import { DocumentEventListener, DocumentEventProps } from "@solid-primitives/event-listener";

export const Rust404: Component = () => {
    let canvas: HTMLCanvasElement;
    let p: HTMLParagraphElement;
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
        const now = window.performance.now();
        if (game === undefined) {
            // initialize the whole shit
            await init();
            game = await Game.new();
            // initialize the
            startup = now;
        }

        // NOTE: there is an issue with pointer lock in chrome (or others (not tested))
        // https://discourse.threejs.org/t/how-to-avoid-pointerlockcontrols-error/33017
        if (!running) {
            canvas.requestPointerLock();
        }
    };

    const lockChange: DocumentEventProps["onPointerlockchange"] = e => {
        if (document.pointerLockElement === canvas) {
            // that should be the action that we dispatched ourselves
            running = true;
            p.style.visibility = "hidden";
            // kickstart the render loop
            renderLoop(startup);
        } else {
            running = false;
            p.style.visibility = "inherit";
            p.textContent = "Click to continue the game";
        }
    };

    return (
        <div
            class={
                "border-[3px] border-darker dark:border-kinda-white relative " +
                "shadow-solid shadow-darker/25 dark:shadow-kinda-white/25 " +
                "inline-block rounded-2xl dark:from-yellow dark:to-dark from-green to-yellow bg-gradient-to-l overflow-hidden"
            }
        >
            <canvas ref={canvas} id={"canvas"} width={600} height={400} onClick={onClick} />
            <p ref={p} class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Click to start the game
            </p>
            <DocumentEventListener onPointerlockchange={lockChange} />
        </div>
    );
};
