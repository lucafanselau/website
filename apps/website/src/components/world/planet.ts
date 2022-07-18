import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
import { makeNoise3D } from "fast-simplex-noise";
import { makeSphereSurface, Options } from "fractal-noise";

// gracefully taken from three.js
// and adapted for planet generation https://github.com/mrdoob/three.js/blob/master/src/geometries/SphereGeometry.js
class PlanetGeometry extends BufferGeometry {
    constructor(
        radius = 1,
        options: Options = {
            amplitude: 0.07,
            frequency: 0.5,
            octaves: 8,
            persistence: 0.2,
        },
        circumference = 64,
        phiStart = 0,
        phiLength = Math.PI * 2,
        thetaStart = 0,
        thetaLength = Math.PI
    ) {
        console.log("do geometry");
        super();
        this.type = "SphereGeometry";

        this.parameters = {
            radius: radius,
            widthSegments: circumference,
            heightSegments: circumference,
            phiStart: phiStart,
            phiLength: phiLength,
            thetaStart: thetaStart,
            thetaLength: thetaLength,
        };

        // widthSegments = Math.max(3, Math.floor(widthSegments));
        // heightSegments = Math.max(2, Math.floor(heightSegments));

        const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);

        let index = 0;
        const grid = [];

        const vertex = new Vector3();
        const normal = new Vector3();

        // buffers

        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];

        // generate vertices, normals and uvs
        const heightMap = makeSphereSurface(circumference, makeNoise3D(), options) as unknown as number[][];
        console.log(heightMap);

        for (let iy = 0; iy <= circumference; iy++) {
            const verticesRow = [];

            const v = iy / circumference;

            // special case for the poles

            let uOffset = 0;

            if (iy == 0 && thetaStart == 0) {
                uOffset = 0.5 / circumference;
            } else if (iy == circumference && thetaEnd == Math.PI) {
                uOffset = -0.5 / circumference;
            }

            for (let ix = 0; ix <= circumference; ix++) {
                const u = ix / circumference;

                const height = 1 + heightMap[ix === circumference ? 0 : ix][iy === circumference ? 0 : iy];
                // vertex

                vertex.x = height * -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = height * radius * Math.cos(thetaStart + v * thetaLength);
                vertex.z = height * radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

                vertices.push(vertex.x, vertex.y, vertex.z);

                // normal

                normal.copy(vertex).normalize();
                normals.push(normal.x, normal.y, normal.z);

                // uv

                uvs.push(u + uOffset, 1 - v);

                verticesRow.push(index++);
            }

            grid.push(verticesRow);
        }

        // indices

        for (let iy = 0; iy < circumference; iy++) {
            for (let ix = 0; ix < circumference; ix++) {
                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];

                if (iy !== 0 || thetaStart > 0) indices.push(a, b, d);
                if (iy !== circumference - 1 || thetaEnd < Math.PI) indices.push(b, c, d);
            }
        }

        // build geometry
        // this.setAttribute("color")

        this.setIndex(indices);
        this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
        this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
        this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    }

    static fromJSON(data: any) {
        return new PlanetGeometry(data.radius, data.circumference, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
    }
}

export { PlanetGeometry };

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomColors = (total: number, mode = "lab", padding = 0.175, parts = 4) => {
    let colors = [];
    const part = Math.floor(total / parts);
    const reminder = total % parts;

    // hues to pick from
    const baseHue = random(0, 360);
    const hues = [0, 60, 120, 180, 240, 300].map(offset => {
        return (baseHue + offset) % 360;
    });

    //  low saturated color
    const baseSaturation = random(5, 40);
    const baseLightness = random(0, 20);
    const rangeLightness = 90 - baseLightness;

    colors.push(HUSL.toHex(hues[0], baseSaturation, baseLightness * random(0.25, 0.75)));

    for (let i = 0; i < part - 1; i++) {
        colors.push(HUSL.toHex(hues[0], baseSaturation, baseLightness + rangeLightness * Math.pow(i / (part - 1), 1.5)));
    }

    // random shades
    const minSat = random(50, 70);
    const maxSat = minSat + 30;
    const minLight = random(45, 80);
    const maxLight = Math.min(minLight + 40, 95);

    for (let i = 0; i < part + reminder - 1; i++) {
        colors.push(HUSL.toHex(hues[random(0, hues.length - 1)], random(minSat, maxSat), random(minLight, maxLight)));
    }

    colors.push(HUSL.toHex(hues[0], baseSaturation, rangeLightness));

    //colors = shuffleArray(colors);

    return chroma.scale(colors).padding(padding).mode(mode).colors(total);
};
