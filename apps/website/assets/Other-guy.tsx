/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    pants: THREE.SkinnedMesh
    scheguy: THREE.SkinnedMesh
    sweater: THREE.SkinnedMesh
    ears: THREE.Mesh
    eyes: THREE.Mesh
    glasses: THREE.Mesh
    hair: THREE.Mesh
    Cube: THREE.Mesh
    Cube_1: THREE.Mesh
    nose: THREE.Mesh
    ['teeth-lower']: THREE.Mesh
    ['teeth-upper']: THREE.Mesh
    Bone: THREE.Bone
  }
  materials: {
    ['Material.004']: THREE.MeshStandardMaterial
    skin: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
    skin: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    hair: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
  }
}

type ActionName = 'body-armatureAction'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/other-guy-transformed.glb') as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="body-armature">
          <primitive object={nodes.Bone} />
          <skinnedMesh name="pants" geometry={nodes.pants.geometry} material={materials['Material.004']} skeleton={nodes.pants.skeleton} />
          <skinnedMesh name="scheguy" geometry={nodes.scheguy.geometry} material={materials.skin} skeleton={nodes.scheguy.skeleton} />
          <skinnedMesh name="sweater" geometry={nodes.sweater.geometry} material={materials['Material.006']} skeleton={nodes.sweater.skeleton} />
        </group>
        <mesh name="ears" castShadow receiveShadow geometry={nodes.ears.geometry} material={materials.skin} rotation={[Math.PI / 2, 0, Math.PI]} scale={[0.17, 0.05, 0.18]} />
        <mesh name="eyes" castShadow receiveShadow geometry={nodes.eyes.geometry} material={materials['Material.001']} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.06, 0.09, 0.05]} />
        <mesh name="glasses" castShadow receiveShadow geometry={nodes.glasses.geometry} material={materials.Material} rotation={[-Math.PI, 0, -Math.PI]} scale={0.02} />
        <mesh name="hair" castShadow receiveShadow geometry={nodes.hair.geometry} material={materials.hair} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.72, -0.84, 0.68]} />
        <group name="head" rotation={[-Math.PI, 0, -Math.PI]} scale={[0.72, -0.84, 0.68]}>
          <mesh name="Cube" castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.skin} />
          <mesh name="Cube_1" castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials['Material.003']} />
        </group>
        <mesh name="nose" castShadow receiveShadow geometry={nodes.nose.geometry} material={materials.skin} rotation={[-Math.PI, 0, -Math.PI]} scale={0.08} />
        <mesh name="teeth-lower" castShadow receiveShadow geometry={nodes['teeth-lower'].geometry} material={nodes['teeth-lower'].material} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.23, 0.08, -0.08]} />
        <mesh name="teeth-upper" castShadow receiveShadow geometry={nodes['teeth-upper'].geometry} material={nodes['teeth-upper'].material} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.23, -0.08, -0.08]} />
      </group>
    </group>
  )
}

useGLTF.preload('/other-guy-transformed.glb')
