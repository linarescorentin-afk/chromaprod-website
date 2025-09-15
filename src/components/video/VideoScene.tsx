"use client";

import { Scroll, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";
import FilmPlan from "./FilmPlan";
import "./materials/filmEffectMaterial";
import * as THREE from "three";
import { IVideo } from "./VideoComponent";

function VideoScene({
  widthPercent,
  videos,
  onClick,
}: {
  widthPercent: number;
  videos: IVideo[];
  onClick: (video: IVideo) => void;
}) {
  // ✅ Référence pour le scroll
  const scroll = useScroll();
  const [windowWidth, setWindowWidth] = useState<number>(0);

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
  const isTablet = windowWidth >= 768 && windowWidth < 1200;

  const spacing = isMobile ? 4.7 : isTablet ? 4.7 : 4.65;

  // 📐 Taille des plans : horizontaux sur desktop, verticaux sur mobile
  const planeWidth = isMobile ? 4 : isTablet ? 5.7 : 7;
  const planeHeight = isMobile ? 2.5 : isTablet ? 4.1 : 4.1;

  // ✅ Textures
  const textures = useLoader(
    TextureLoader,
    videos.map((video) => video.thumbnail),
  );

  // ✅ Variables pour le bombé
  const lastOffset = useRef(0);
  const currentShift = useRef(0);

  useFrame(() => {
    // ✅ effet bombé + parallax
    const delta = scroll.offset - lastOffset.current;
    lastOffset.current = scroll.offset;

    // 2️⃣ ajoute un “kick” si on scrolle
    const boost = Math.abs(delta) * 2;
    currentShift.current += boost;

    // 3️⃣ ralentit progressivement
    currentShift.current *= 0.9;

    // 4️⃣ clamp
    currentShift.current = Math.min(currentShift.current, 1);

    // ✅ bombage direct en fonction du scroll
    materials.current.forEach((mat, i) => {
      if (mat) {
        mat.shift = currentShift.current * 4;

        // ✅ scroll relatif : on “ramène” le scroll sur la zone de cette image
        const relativeScroll = scroll.offset * (textures.length - 1) - i;

        // ✅ parallax toujours centré sur l’image
        const parallaxIntensity = 0.3; // à ajuster
        const relativeOffset = relativeScroll * parallaxIntensity;

        mat.parallax = relativeOffset;
      }
    });
  });

  return (
    <Scroll>
      {textures.map((texture, i) => {
        const scaleMax = 1;

        // ✅ valeur par défaut : scale au max
        let smoothScale = scaleMax;

        if (widthPercent > 50) {
          // calcule un facteur entre 0 (à 50%) et 1 (à 100%)
          const t = (widthPercent - 50) / 50;

          // ✅ on lerp de 1.2 (scaleMax) vers 0.98 au fur et à mesure que widthPercent augmente
          smoothScale = THREE.MathUtils.lerp(scaleMax, 0.98, t);
        }
        return (
          <FilmPlan
            onClick={() => {
              onClick(videos[i]);
            }}
            key={i}
            position={[0, -i * spacing, 0]}
            registerMaterial={(ref) => {
              if (ref && ref.parallax == null) ref.parallax = 0;
              materials.current[i] = ref;
            }}
            texture={texture}
            planeWidth={planeWidth * smoothScale}
            planeHeight={planeHeight * smoothScale}
          />
        );
      })}
    </Scroll>
  );
}

export default VideoScene;
