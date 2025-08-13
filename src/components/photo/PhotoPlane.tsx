import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./materials/photoEffectMaterial";

interface IProps {
  position: [number, number, number];
  texture: THREE.Texture;
  width: number;
  height: number;
  onClick?: () => void;
  shiftRef: React.MutableRefObject<number>;
  isSelected: boolean;
  isVertical: boolean;
  delta: number;
  texturesLength: number;
  selectedIndex: number | null;
  baseImages: number;
}

function PhotoPlane({
  position,
  texture,
  width,
  height,
  onClick,
  shiftRef,
  isSelected,
  isVertical,
  delta,
  texturesLength,
  selectedIndex,
  baseImages,
}: IProps) {
  const materialRef = useRef<{
    map: THREE.Texture | null;
    shift: number | null;
    opacityOnClick: number;
  } | null>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.map = texture;
    }
  }, [texture]);

  console.log(baseImages, texturesLength);

  // ✅ met à jour `shift` à CHAQUE frame directement dans le shader
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.shift = shiftRef.current;

      const targetOpacity = selectedIndex !== null && !isSelected ? 0 : 1;

      materialRef.current.opacityOnClick = targetOpacity;
    }

    // const baseExtra = texturesLength >= baseImages ? 0.55 : 0.48;
    // const extraPage = baseExtra - (texturesLength - baseImages) * 0.05;

    // const scrollY = scroll.offset * baseImages * spacingY;

    if (meshRef.current) {
      // 📏 calcule le scale en fonction du shift
      const baseScale = 1.0;
      const minScale = 0.9; // quand on scrolle fort
      const s = baseScale - (baseScale - minScale) * shiftRef.current;

      // ⚡ interpolation fluide
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, 1), 0.1);

      if (hovered && delta < 0.01) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1), 0.1);
      }

      // 📍 position : si sélectionné → centrer
      const targetPos = isSelected
        ? new THREE.Vector3(0, position[1], isVertical ? 0.2 : 1)
        : new THREE.Vector3(...position);
      meshRef.current.position.lerp(targetPos, 0.1);
    }
  });

  return (
    <mesh
      position={position}
      onClick={onClick}
      ref={meshRef}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <planeGeometry args={[width, height]} />
      <photoEffectMaterial ref={materialRef} />
    </mesh>
  );
}

export default PhotoPlane;
