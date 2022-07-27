// This is free and unencumbered software released into the public domain

import { makeNoise3D } from "fast-simplex-noise";

const TWO_PI = 2 * Math.PI;

export interface Options {
    amplitude: number;
    frequency: number;
    octaves: number;
    persistence: number;
}

function processOptions(options: Partial<Options>): Options {
    return {
        amplitude: typeof options.amplitude === "number" ? options.amplitude : 1.0,
        frequency: typeof options.frequency === "number" ? options.frequency : 1.0,
        octaves: typeof options.octaves === "number" ? Math.floor(options.octaves) : 1,
        persistence: typeof options.persistence === "number" ? options.persistence : 0.5,
    };
}

export class Noiser {
    options: Options;
    noise: ReturnType<typeof makeNoise3D>;
    constructor(options: Options) {
        this.options = processOptions(options);
        this.noise = makeNoise3D();
    }

    sample3d(vec: { x: number; y: number; z: number }) {
        const { amplitude, frequency, octaves, persistence } = this.options;
        let value = 0.0;
        for (let octave = 0; octave < octaves; octave++) {
            const freq = frequency * Math.pow(2, octave);
            value += this.noise(vec.x * freq, vec.y * freq, vec.z * freq) * (amplitude * Math.pow(persistence, octave));
        }
        return value / (2 - 1 / Math.pow(2, octaves - 1));
    }
}
