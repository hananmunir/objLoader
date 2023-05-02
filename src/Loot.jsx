import React, { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";

export function Model(props) {
  const { nodes, materials } = useGLTF("/loot.glb");
  let targetY = 0;
  let targetX = 0;
  const armtexture = new THREE.TextureLoader().load("/wooden.png");
  const hatTextue = new THREE.TextureLoader().load("/red.png");
  const starTexture = new THREE.TextureLoader().load("/star.png");
  const meshRef = useRef(nodes.feet_low_Kang_low011);
  const headRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const { camera } = useThree();
  const [cameraFar, setCameraFar] = useState(false);

  const handleGsapAnim = () => {
    gsap.to(camera.position, {
      z: cameraFar ? 5 : 15,
      x: cameraFar ? 0 : 10,
      y: cameraFar ? -1 : 5,
      duration: 1.5,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });

    setCameraFar(!cameraFar);
  };
  console.log(nodes);
  const handleRigMovement = () => {
    console.log(meshRef.current);

    //create timeline
    const tl = gsap.timeline();
    const t2 = gsap.timeline();
    tl.to(meshRef.current.rotation, {
      x: -0.5,
      duration: 1,
    }).to(meshRef.current.rotation, {
      x: 0,
      duration: 1,
    });

    t2.to(meshRef.current.position, {
      z: 0.3,
      duration: 1,
    }).to(meshRef.current.position, {
      z: 0,
      duration: 1,
    });
  };

  useEffect(() => {
    const handMaterial = new THREE.MeshBasicMaterial({
      map: armtexture,
      color: 0xffffff,
    });

    const hatmaterial = new THREE.MeshBasicMaterial({
      map: hatTextue,
      color: 0xffffff,
    });

    const starMaterial = new THREE.MeshBasicMaterial({
      map: starTexture,
      color: 0xffffff,
    });

    nodes.hands_low_Kang_low015.material = handMaterial;
    nodes.beanie_Cube001.material = hatmaterial;
    nodes.Kang_low.material = starMaterial;
    nodes.feet_low_Kang_low011.material = handMaterial;
    setLoaded(true);
  }, [armtexture, nodes.hands_low_Kang_low015.material]);

  const handleKeyDown = (event) => {
    if (event.key === "w") {
      meshRef.current.rotation.y += 0.1;
    }
  };

  const pointer = { x: 0, y: 0 };

  window.addEventListener("mousemove", (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  useFrame(() => {
    if (headRef.current) {
      targetY =
        -pointer.y < 0.4
          ? -pointer.y > -0.1
            ? -pointer.y * 0.8 + 0.4
            : -pointer.y * 0.8
          : -pointer.y * 0.9;

      targetX =
        pointer.x < 0.2 && pointer.x > -0.4
          ? pointer.x * 0.1 + 0.3
          : pointer.x * 0.8;

      //Horizontal
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetX,
        0.02
      );

      //Vertical
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetY,
        0.02
      );
    }
  });

  window.addEventListener("keydown", handleKeyDown);

  return (
    { loaded } && (
      <>
        <group {...props} dispose={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {/* Legs */}

          <group ref={headRef}>
            <mesh
              geometry={nodes.feet_low_Kang_low011.geometry}
              material={nodes.feet_low_Kang_low011.material}
              position={[0, 0, 0.1]}
              ref={meshRef}
            />

            {/* Hands */}
            <mesh
              geometry={nodes.hands_low_Kang_low015.geometry}
              material={nodes.hands_low_Kang_low015.material}
            />
            <mesh
              geometry={nodes.Properties_Text.geometry}
              material={nodes.Properties_Text.material}
            />
            {/* Hat */}
            <mesh
              geometry={nodes.beanie_Cube001.geometry}
              material={nodes.beanie_Cube001.material}
            />
            {/* Glasses */}
            <mesh
              geometry={nodes.glasses_Circle003.geometry}
              material={nodes.glasses_Circle003.material}
            />
            {/* Mouth */}
            <mesh
              geometry={nodes.mouth_low_Kang_low002.geometry}
              material={nodes.mouth_low_Kang_low002.material}
            />
            {/* Hair */}
            <mesh
              geometry={nodes.hair_low_Kang_low031.geometry}
              material={nodes.hair_low_Kang_low031.material}
            />
            {/* Eye Mask */}
            <mesh
              geometry={nodes.mask_low_Kang_low033.geometry}
              material={nodes.mask_low_Kang_low033.material}
            />
            {/* Tongue */}
            <mesh
              geometry={nodes.mouth_low001_Kang_low003.geometry}
              material={nodes.mouth_low001_Kang_low003.material}
            />

            {/* Face */}
            <mesh
              geometry={nodes["kangVF_head_(1)_kangVF_head_(1)002"].geometry}
              material={nodes["kangVF_head_(1)_kangVF_head_(1)002"].material}
            />
            {/* Hair */}
            <mesh
              geometry={nodes.hair_low001_Kang_low001.geometry}
              material={nodes.hair_low001_Kang_low001.material}
            />
            {/* Eye */}
            <mesh
              geometry={nodes.DMAD_iris_l_Sphere001.geometry}
              material={nodes.DMAD_iris_l_Sphere001.material}
            />
            {/* Eye */}
            <mesh
              geometry={nodes.DMAD_cornea_l_Sphere010.geometry}
              material={nodes.DMAD_cornea_l_Sphere010.material}
            />
            {/* Eye */}
            <mesh
              geometry={nodes.DMAD_cornea_r_Sphere005.geometry}
              material={nodes.DMAD_cornea_r_Sphere005.material}
            />
            {/* Eye */}
            <mesh
              geometry={nodes.DMAD_iris_r_Sphere006.geometry}
              material={nodes.DMAD_iris_r_Sphere006.material}
            />
            {/* Cap Star */}
            <mesh
              geometry={nodes.Kang_low.geometry}
              material={nodes.Kang_low.material}
            />
          </group>
        </group>
        <Html
          style={{
            width: "100vw",
          }}
        >
          <div
            style={{
              width: "50%",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              style={{
                marginBottom: ".5rem",
              }}
              onClick={handleGsapAnim}
            >
              GSAP Camera Movement
            </button>
            <button onClick={handleRigMovement}>Rig Movement</button>
          </div>
        </Html>
      </>
    )
  );
}

useGLTF.preload("/loot.glb");
