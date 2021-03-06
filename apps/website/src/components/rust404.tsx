/** @jsxImportSource solid-js */

import { Component, createSignal, JSX, onMount } from "solid-js";
import init, { Game } from "rust-404";
import { DocumentEventListener, DocumentEventProps } from "@solid-primitives/event-listener";

export const Rust404: Component = () => {
    let canvas: HTMLCanvasElement | undefined;
    let p: HTMLParagraphElement | undefined;
    let game: Game | undefined;
    let startup: number;
    let running = false;

    const renderLoop = (last: number) => {
        const now = window.performance.now();
        game?.update((now - last) / 1000.0, now / 1000.0);
        game?.render();
        if (running) requestAnimationFrame(() => renderLoop(now));
    };
    const onClick: JSX.DOMAttributes<HTMLCanvasElement>["onClick"] = async event => {
        const now = window.performance.now();
        if (game === undefined) {
            // initialize the whole shit
            try {
                if (p !== undefined) p.textContent = "Loading...";
                await init();
                game = await Game.new();
                // initialize the
                startup = now;
                if (p !== undefined) p.textContent = "Click to start adventure";
            } catch (err) {
                console.error("failed to create game instance");
                if (p !== undefined) p.textContent = "Failed to load game. See Notes for more Information";
            }
        }

        console.log("got here");

        // NOTE: there is an issue with pointer lock in chrome (or others (not tested))
        // https://discourse.threejs.org/t/how-to-avoid-pointerlockcontrols-error/33017
        if (!running && game !== undefined) {
            console.log("and here", canvas);
            canvas?.requestPointerLock();
        }
    };

    const lockChange: DocumentEventProps["onPointerlockchange"] = e => {
        if (document.pointerLockElement === canvas) {
            // that should be the action that we dispatched ourselves
            running = true;
            if (p !== undefined) p.style.visibility = "hidden";
            // kickstart the render loop
            renderLoop(startup);
        } else {
            running = false;
            if (p !== undefined) {
                p.style.visibility = "inherit";
                p.textContent = "Click to continue the game";
            }
        }
    };

    return (
        <div
            class={
                "border-[3px] border-darker dark:border-kinda-white relative " +
                "shadow-solid shadow-darker/25 dark:shadow-kinda-white/25 " +
                "inline-block rounded-2xl dark:from-yellow dark:to-green from-green to-yellow bg-gradient-to-l overflow-hidden " +
                "max-w-[600px] w-full"
            }
        >
            <canvas ref={canvas} id={"canvas"} width={600} height={400} onClick={onClick} onContextMenu={e => e.preventDefault()} />
            <p
                ref={p}
                class="absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-yellow rounded-xl dark:bg-darker border-[2px] border-darker dark:border-kinda-white"
            >
                Click to start the game
            </p>
            <DocumentEventListener onPointerlockchange={lockChange} />
        </div>
    );
};
