/** @jsxImportSource react */

import {
    Backdrop,
    ContactShadows,
    Edges,
    Environment,
    Float,
    Lightformer,
    Scroll,
    ScrollControls,
    Stats,
    useScroll,
} from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Color, Depth, LayerMaterial, Noise } from "lamina";
import { useControls } from "leva";
import { FC, ReactNode, useMemo, useRef, useState } from "react";
import { BackSide, Group, Mesh } from "three";
import { PlanetGeometry } from "./planet";
import { PlanetPolyhedronGeometry } from "./ico-planet";
/* extend({ PlanetGeometry }); */

const Planet: FC = props => {
    const options = useControls({
        amplitude: {
            value: 0.1,
            step: 0.01,
        },
        frequency: 0.55,
        octaves: {
            value: 7,
            step: 1,
        },
        persistence: {
            value: 0.64,
            step: 0.01,
        },
    });

    const geometry = useMemo(() => new PlanetPolyhedronGeometry(2, 32, options), [options]);
    /* const geometry = useMemo(() => new PlanetGeometry(2, options), [options]); */

    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>(null);
    const parent = useRef<Group>(null);
    const ocean = useRef<Mesh>(null);
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const scroll = useScroll();
    const camera = useThree(s => s.camera);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        /* mesh.current && (mesh.current.rotation.y += delta * 0.6);
         * ocean.current && (ocean.current.rotation.y += delta * 0.6); */
        parent.current && (parent.current.rotation.y = Math.PI * scroll.range(0, 1));

        /* camera.position.set(0,); */
        camera.position.set(0, 2.4 * scroll.range(0, 1), 0.5 + 4 * (1 - scroll.range(0, 1)));
        /* console.log(camera.position); */
        camera.lookAt(0, 2.2 * scroll.range(0, 1), 0);

        camera.updateProjectionMatrix();
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <group ref={parent} position={[0, 0, 0]}>
            <mesh ref={ocean} position={[0, 0, 0]} receiveShadow>
                <icosahedronGeometry args={[2, 10]} />
                <meshStandardMaterial
                    color={"#0496FF"}
                    transparent
                    opacity={0.7}
                    flatShading={true}
                    roughness={0.1}
                    metalness={0.5}
                    envMapIntensity={2}
                />
            </mesh>
            <mesh
                {...props}
                ref={mesh}
                position={[0, 0, 0]}
                onClick={event => setActive(!active)}
                onPointerOver={event => setHover(true)}
                onPointerOut={event => setHover(false)}
                geometry={geometry}
                receiveShadow
            >
                <meshStandardMaterial color={"#89B0AE"} flatShading={true} roughness={0.65} metalness={0.5} envMapIntensity={2} />
            </mesh>
        </group>
    );
};

const Html: FC = () => {
    const size = useThree(s => s.size);

    return (
        <Scroll html>
            {/* <h1>html in here (optional)</h1>
            <h1 style={{ position: "absolute", top: size.height }}>second page</h1>
            <h1 style={{ position: "absolute", top: 2 * size.height }}>third page</h1> */}
        </Scroll>
    );
};
function Striplight(props) {
    return (
        <mesh {...props}>
            <boxGeometry />
            <meshBasicMaterial color="white" />
        </mesh>
    );
}
const World: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Canvas>
            <ScrollControls pages={3}>
                <Planet />
                <Html />
                <spotLight position={[5, 15, 7]} angle={0.3} penumbra={1} castShadow intensity={0.5} shadow-bias={-0.0001} />
                <directionalLight position={[-5, 5, 7]} castShadow intensity={0.7} shadow-bias={-0.0001} />
                <ambientLight intensity={0.2} />
                {/* <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={10} blur={3} opacity={1} far={10} /> */}
                <Environment preset={"night"} />
                <Stats />
            </ScrollControls>
        </Canvas>
    );
};
export default World;
