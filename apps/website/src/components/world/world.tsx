/** @jsxImportSource react */

import { ContactShadows, Environment, Float, Lightformer, Scroll, ScrollControls, Stats, useScroll } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Color, Depth, LayerMaterial } from "lamina";
import { useControls } from "leva";
import { FC, ReactNode, useMemo, useRef, useState } from "react";
import { BackSide, Group, Mesh } from "three";
import { PlanetGeometry } from "./planet";
import { PlanetPolyhedronGeometry } from "./ico-planet";
/* extend({ PlanetGeometry }); */

const Planet: FC = props => {
    const options = useControls({
        amplitude: 0.07,
        frequency: 0.1,
        octaves: {
            value: 8,
            step: 1,
        },
        persistence: 0.75,
    });

    const geometry = useMemo(() => new PlanetPolyhedronGeometry(2, 16, options), [options]);
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
        camera.position.set(0, 4 * scroll.range(0, 1), 1 + 4 * (1 - scroll.range(0, 1)));
        /* console.log(camera.position); */
        camera.lookAt(0, 1, 0);

        camera.updateProjectionMatrix();
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <group ref={parent} position={[0, 0, 0]}>
            <mesh ref={ocean} position={[0, 0, 0]}>
                <icosahedronGeometry args={[2, 5]} />
                <meshStandardMaterial color={"#0496FF"} flatShading={true} roughness={0.5} metalness={0.8} envMapIntensity={2} />
            </mesh>
            <mesh
                {...props}
                ref={mesh}
                position={[0, 0, 0]}
                onClick={event => setActive(!active)}
                onPointerOver={event => setHover(true)}
                onPointerOut={event => setHover(false)}
                geometry={geometry}
            >
                <meshStandardMaterial color={"#89B0AE"} flatShading={true} />
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

const World: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Canvas>
            <ScrollControls pages={3}>
                <Planet />
                <Html />
                <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={1} shadow-bias={-0.0001} />
                <ambientLight intensity={0.1} />
                {/* <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={10} blur={3} opacity={1} far={10} /> */}
                {/* Renders contents "live" into a HDRI environment (scene.environment). */}
                <Environment preset={"city"} />
                <Stats />
            </ScrollControls>
        </Canvas>
    );
};
export default World;
