"use client";

import { Scroll, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import FilmPlan from "./FilmPlan";
import "./materials/filmEffectMaterial";

function VideoScene() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const scroll = useScroll();
  const planes = [0, -4.5, -9, -13.5];
  const materials = useRef<
    ({ shift: number; parallax: number | null } | null)[]
  >([]);

  // ✅ écoute la taille de l’écran
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // valeur initiale + listener
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Détecte si on est sur mobile ou desktop
  const isMobile = windowWidth < 768;

  // 📐 Taille des plans : horizontaux sur desktop, verticaux sur mobile
  const baseWidth = 7;
  const baseHeight = isMobile ? 7.8 : 3.8;

  const scaleFactor = windowWidth / 1440; // 1440px = largeur de référence desktop
  const planeWidth = baseWidth * scaleFactor;
  const planeHeight = baseHeight * scaleFactor;
  // ✅ Textures
  const textures = useLoader(TextureLoader, [
    "/ph1.jpg",
    "/ph3.jpg",
    "/ph4.jpeg",
    "/ph5.jpeg",
  ]);

  // ✅ Variables pour le bombé
  const lastOffset = useRef(0);
  const currentShift = useRef(0);

  useFrame(() => {
    // 1️⃣ calcule la vitesse de scroll
    const delta = scroll.offset - lastOffset.current;
    lastOffset.current = scroll.offset;

    // 2️⃣ ajoute un “kick” si on scrolle
    const boost = Math.abs(delta) * 5;
    currentShift.current += boost;

    // 3️⃣ ralentit progressivement
    currentShift.current *= 0.9;

    // 4️⃣ clamp
    currentShift.current = Math.min(currentShift.current, 1);

    // ✅ bombage direct en fonction du scroll
    materials.current.forEach((mat, i) => {
      if (mat) {
        mat.shift = currentShift.current * 0.5;
        const localParallax = scroll.offset - i * 0.25;
        mat.parallax = localParallax;
      }
    });
  });

  return (
    <Scroll>
      {planes.map((posY, i) => (
        <FilmPlan
          key={i}
          position={[0, posY, 0]}
          registerMaterial={(ref) => {
            if (ref && ref.parallax == null) ref.parallax = 0;
            materials.current[i] = ref;
          }}
          texture={textures[i]}
          planeWidth={planeWidth}
          planeHeight={planeHeight}
        />
      ))}
    </Scroll>
  );
}

export default VideoScene;
