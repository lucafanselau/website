/** @jsxImportSource react */

import { ContactShadows, Environment, Float, Lightformer, Scroll, ScrollControls, Stats } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Color, Depth, LayerMaterial } from "lamina";
import { useControls } from "leva";
import { FC, ReactNode, useMemo, useRef, useState } from "react";
import { BackSide, Group, Mesh } from "three";
import { PlanetGeometry } from "./planet";
extend({ PlanetGeometry });

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

    const geometry = useMemo(() => new PlanetGeometry(2, options), [options]);

    // This reference will give us direct access to the mesh
    const mesh = useRef<Mesh>(null);
    const ocean = useRef<Mesh>(null);
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        mesh.current && (mesh.current.rotation.y += delta * 0.6);
        ocean.current && (ocean.current.rotation.y += delta * 0.6);
    });
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <group position={[0, 0, 0]}>
            <mesh ref={ocean} position={[0, 0, 0]} scale={active ? 1.5 : 1}>
                <sphereGeometry args={[2]} />
                <meshStandardMaterial color={"#0496FF"} flatShading={true} roughness={0.5} metalness={0.8} envMapIntensity={2} />
            </mesh>
            <mesh
                {...props}
                ref={mesh}
                position={[0, 0, 0]}
                scale={active ? 1.5 : 1}
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

const World: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Canvas>
            <ScrollControls pages={3}>
                <Planet />
                <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={1} shadow-bias={-0.0001} />
                <ambientLight intensity={0.1} />
                <Scroll html>
                    {children}
                    <h1>html in here (optional)</h1>
                    <h1 style={{ position: "absolute", top: "100vh" }}>second page</h1>
                    <h1 style={{ position: "absolute", top: "200vh" }}>third page</h1>
                </Scroll>
                {/* <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={10} blur={3} opacity={1} far={10} /> */}
                {/* Renders contents "live" into a HDRI environment (scene.environment). */}
                <Environment preset={"city"} />
                <Stats />
            </ScrollControls>
        </Canvas>
    );
};
export default World;
