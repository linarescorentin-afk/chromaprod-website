import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FilmPlan({
  position,
  registerMaterial,
  texture,
  planeWidth,
  planeHeight,
  shiftRef,
  onClick,
}: {
  position: [number, number, number];
  registerMaterial: (
    ref: { shift: number; parallax: number | null } | null,
  ) => void;
  texture: THREE.Texture;
  planeWidth: number;
  planeHeight: number;
  shiftRef: React.MutableRefObject<number>;
  onClick: () => void;
}) {
  const materialRef = useRef<{
    shift: number;
    parallax: number | null;
    map: THREE.Texture | null;
    time: number;
    noiseStrength: number;
  } | null>(null);

  // ✅ on “donne” le ref au parent
  useEffect(() => {
    registerMaterial(materialRef.current);
    if (materialRef.current) {
      materialRef.current.map = texture; // ✅ on applique la texture au shader
    }
  }, [registerMaterial, texture]);

  useFrame((state) => {
    if (materialRef.current) {
      // ✅ update time pour animer la neige
      materialRef.current.time = state.clock.elapsedTime;

      // ✅ plus on scroll, plus la neige est intense (jusqu’à 0.4)
      materialRef.current.noiseStrength = Math.max(
        0.2,
        Math.min(0.6, shiftRef.current * 1.5),
      );
      // ✅ envoie aussi shift pour le reste (si besoin)
      materialRef.current.shift = shiftRef.current;
    }
  });
  return (
    <mesh
      onClick={() => onClick()}
      position={position}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <planeGeometry args={[planeWidth, planeHeight, 64, 64]} />
      <filmEffectMaterial ref={materialRef} />
    </mesh>
  );
}
