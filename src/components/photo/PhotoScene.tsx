"use client";
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextureLoader } from "three";
import PhotoPlane from "./PhotoPlane";
import * as THREE from "three";
interface IProps {
  photos: string[];
  selectedIndex: number | null;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
  widthPercent: number;
}

function PhotoScene({
  photos,
  selectedIndex,
  setSelectedIndex,
  widthPercent,
}: IProps) {
  // 📏 État pour la largeur de la fenêtre
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const scroll = useScroll();

  const [clickOffset, setClickOffset] = useState<number | null>(null); // ✅ on mémorise la position du scroll

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  // 🔄 écoute le resize
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 728;
  const isTablet = windowWidth >= 728 && windowWidth < 1224;
  // 🖼️ Charge tes images
  const textures = useLoader(TextureLoader, [...photos]);

  // 📐 Infos sur les formats → tu peux adapter selon tes vraies images
  const formats: ("horizontal" | "vertical")[] = [
    "horizontal", // ph1
    "vertical", // ph3
    "horizontal", // ph4
    "horizontal", // ph5
    "vertical", // ph6
    "horizontal", // ph7
  ];

  // 📏 Dimensions de base
  const baseWidth = isMobile ? 4.2 : isTablet ? 6 : 8;
  const baseHeight = isMobile ? 3 : isTablet ? 4 : 5;
  const baseHeightVertical = isMobile ? 4.5 : isTablet ? 5 : 6.5;

  // 📍 Spacing vertical
  const spacingY = isMobile ? 4 : 8; // espace entre les images

  // 📍 Offset horizontal pour quinconce sur desktop
  // const offsetX = -2; // à ajuster selon le rendu
  const offsetX = -2;

  // 🌊 SHIFT logic
  const lastOffset = useRef(0);
  const shift = useRef(0);

  // ✅ logique pour calculer shift en fonction du scroll
  useFrame(() => {
    const delta = scroll.offset - lastOffset.current;
    lastOffset.current = scroll.offset;

    // ✅ Plus on scroll vite, plus shift monte
    const boost = Math.abs(delta) * 30;
    shift.current += boost;

    // ✅ shift revient doucement vers 0 (couleur)
    shift.current *= 0.9;

    // ✅ clamp pour rester entre 0 et 1
    shift.current = Math.min(1, Math.max(0, shift.current));

    // ✅ Si delta est significatif → on considère qu'on scrolle
    if (Math.abs(delta) > 0.0005) {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 10);
      // 🔥 150ms après la dernière “secousse”, on considère que le scroll est fini
    }

    // 📌 🔥 Vérification de la fermeture au scroll
    if (selectedIndex !== null && clickOffset !== null) {
      const distanceScrolled = Math.abs(scroll.offset - clickOffset);

      if (distanceScrolled > 0.02) {
        // 👈 ajustable (plus bas = plus sensible)
        setSelectedIndex(null);
        setClickOffset(null);
      }
    }
  });

  useEffect(() => {
    setSelectedIndex(null); // Réinitialise la sélection au montage
  }, [widthPercent, setSelectedIndex]);
  return (
    <>
      <Scroll>
        {textures.map((tex, i) => {
          const isVertical = formats[i] === "vertical";

          // 📍 Position Y → une image par ligne
          const posY = -i * spacingY;

          // 📍 Quinconce quand on "ouvre" (quand widthPercent est < 50)
          const quinconceOffset = i % 2 === 0 ? -offsetX : offsetX;

          // 📍 Position alignée à gauche (état de base)
          const alignLeftPos = isVertical ? (isMobile ? 1 : 3.5) : 2;

          // 🔥 Facteur de transition inversé :
          //  - 0 = aligné à gauche
          //  - 1 = quinconce
          const t = Math.max(0, (50 - widthPercent) / 50); // clamp 0 → 1

          // 🏗 LERP inversé : commence aligné à gauche, puis "ouvre" en quinconce
          const smoothPosX = THREE.MathUtils.lerp(
            alignLeftPos,
            isMobile ? 0 : quinconceOffset,
            t,
          );

          // 🔥 Scale interpolé :
          //  - Quand widthPercent = 50 ou + → scale max (par ex. 1.2)
          //  - Quand widthPercent < 50 → revient progressivement à 1.0
          const scaleMax = isMobile ? 1 : 1.2;
          const smoothScale = THREE.MathUtils.lerp(scaleMax, 1.0, t);

          return (
            <PhotoPlane
              key={i}
              position={[smoothPosX, posY, 0]}
              texture={tex}
              width={(isVertical ? baseWidth * 0.6 : baseWidth) * smoothScale}
              height={
                (isVertical ? baseHeightVertical : baseHeight) * smoothScale
              }
              isVertical={isVertical}
              delta={scroll.offset - lastOffset.current} // ✅ passe le delta pour l'animation
              onClick={() => {
                if (isScrolling) return;

                if (selectedIndex === i) {
                  // si on reclique → on ferme
                  setSelectedIndex(null);
                  setClickOffset(null);
                } else if (widthPercent <= 1) {
                  setSelectedIndex(i);
                  setClickOffset(scroll.offset); // ✅ mémorise la position du scroll au clic
                }
              }}
              shiftRef={shift} // ✅ passe le ref pour le shift
              isSelected={selectedIndex === i} // ✅ pour gérer la sélection
              scroll={scroll} // ✅ pour gérer la position
              spacingY={spacingY} // ✅ pour gérer l'espacement
              texturesLength={textures.length} // ✅ pour l'animation
              selectedIndex={selectedIndex} // ✅ pour gérer la sélection
            />
          );
        })}
      </Scroll>
    </>
  );
}

export default PhotoScene;
