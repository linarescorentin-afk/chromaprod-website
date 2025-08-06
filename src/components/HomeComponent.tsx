"use client";

import { useEffect, useState } from "react";
import PhotoComponent from "./PhotoComponent";
import VideoComponent from "./VideoComponent";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export default function HomeComponent() {
  const dragX = useMotionValue(0);
  const [widthPercent, setWidthPercent] = useState(50);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isPhotoVisible, setIsPhotoVisible] = useState(true);

  // ✅ Récupère la largeur de l’écran après le montage (côté client)
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // On centre la barre au montage
    dragX.set(window.innerWidth / 2);

    // Écoute dragX pour calculer le % en direct
    const unsubscribe = dragX.on("change", (latest) => {
      if (screenWidth) {
        const percent = (latest / screenWidth) * 100;
        setWidthPercent(Math.round(percent));

        // ✅ lock tant qu’on est entre 1% et 98%
        if (percent > 1 && percent < 98) {
          setIsLocked(true);
        } else {
          setIsLocked(false);
        }
        if (percent >= 98) {
          setIsPhotoVisible(false);
        } else {
          setIsPhotoVisible(true);
        }

        if (percent <= 1) {
          setIsVideoVisible(false);
        } else {
          setIsVideoVisible(true);
        }
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [dragX, screenWidth]);

  // ✅ Fonction pour “auto-drag” la barre
  function moveBarTo(target: "video" | "photo") {
    if (!screenWidth) return;
    const min = screenWidth * 0.01;
    const max = screenWidth * 0.98;

    const targetX = target === "video" ? max : min;

    // ✅ Framer Motion anime automatiquement la value
    animate(dragX, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    });
  }

  // ✅ Clamp la largeur SEULEMENT si screenWidth est défini
  const clampedWidth = useTransform(dragX, (x) => {
    if (!screenWidth) return x; // le temps que le SSR soit hydraté
    const min = screenWidth * 0.01;
    const max = screenWidth * 0.98;
    return Math.min(Math.max(x, min), max);
  });

  return (
    <div>
      {/* SECTION VIDEO */}
      <motion.div
        className="absolute top-0 bg-black z-10 overflow-x-hidden"
        style={{ width: clampedWidth }}
      >
        <VideoComponent
          isVideoVisible={isVideoVisible}
          moveBarTo={moveBarTo}
          widthPercent={widthPercent}
        />
      </motion.div>

      {/* SECTION PHOTO */}
      <PhotoComponent
        isPhotoVisible={isPhotoVisible}
        moveBarTo={moveBarTo}
        widthPercent={widthPercent}
      />

      {/* BARRE DRAGGABLE */}
      <motion.div
        drag="x"
        dragConstraints={{
          left: screenWidth ? screenWidth * 0.01 : 0,
          right: screenWidth ? screenWidth * 0.99 : 1000,
        }}
        onDrag={(e, info) => {
          if (!screenWidth) return;
          const min = screenWidth * 0.01;
          const max = screenWidth * 0.98;
          dragX.set(Math.min(Math.max(info.point.x, min), max));
        }}
        style={{ x: dragX }}
        className="fixed top-0 h-screen w-[30px] cursor-ew-resize z-50 flex justify-start"
      >
        <div className="h-full w-[2px] bg-red-500 hover:bg-red-600 hover:scale-150 transform transition-all duration-300 ease-in-out" />
        <Image
          src="/doublearrow.svg"
          height={100}
          width={100}
          alt="arrow"
          className="absolute transform -translate-x-[29px] -translate-y-1/2 top-10 left-1/2 pointer-events-none"
        />
        <Image
          src="/doublearrow.svg"
          height={100}
          width={100}
          alt="arrow"
          className="absolute transform -translate-x-[29px] -translate-y-1/2 bottom-10 left-1/2 pointer-events-none"
        />
      </motion.div>

      {/* ✅ Debug affichage largeur */}
      {/* <div className="fixed bottom-4 left-4 bg-white text-black px-3 z-20 py-1 rounded shadow">
        Largeur section vidéo: {widthPercent}%
      </div> */}
    </div>
  );
}
