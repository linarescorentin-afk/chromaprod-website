import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FilmPlan({
  position,
  registerMaterial,
  texture,
  planeWidth,
  planeHeight,
}: {
  position: [number, number, number];
  registerMaterial: (
    ref: { shift: number; parallax: number | null } | null,
  ) => void;
  texture: THREE.Texture;
  planeWidth: number;
  planeHeight: number;
}) {
  const materialRef = useRef<{
    shift: number;
    parallax: number | null;
    map: THREE.Texture | null;
  } | null>(null);

  // ✅ on “donne” le ref au parent
  useEffect(() => {
    registerMaterial(materialRef.current);
    if (materialRef.current) {
      materialRef.current.map = texture; // ✅ on applique la texture au shader
    }
  }, [registerMaterial, texture]);

  return (
    <mesh position={position}>
      <planeGeometry args={[planeWidth, planeHeight, 64, 64]} />
      <filmEffectMaterial ref={materialRef} color="white" />
    </mesh>
  );
}
