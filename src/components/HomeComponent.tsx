"use client";

import { useEffect, useRef, useState } from "react";
import PhotoComponent from "./PhotoComponent";
import VideoComponent, { IVideo } from "./VideoComponent";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useWindowsWidth } from "@/store/useWindowsWidth";

export default function HomeComponent() {
  const dragX = useMotionValue(0);
  const [widthPercent, setWidthPercent] = useState(50);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isPhotoVisible, setIsPhotoVisible] = useState(true);
  const [activeVideo, setActiveVideo] = useState<IVideo | null>(null);
  const { setWindowWidth } = useWindowsWidth();
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🔄 écoute le resize
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowWidth]);

  useEffect(() => {
    if (activeVideo && videoRef.current) {
      videoRef.current.volume = 0.5; // 🔈 50% de volume
    }
  }, [activeVideo]);

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

        if (percent >= (screenWidth < 728 ? 97 : 98)) {
          setIsPhotoVisible(false);
        } else {
          setIsPhotoVisible(true);
        }

        if (percent <= (screenWidth < 728 ? 3 : 1)) {
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
    const min = screenWidth * (screenWidth < 728 ? 0.03 : 0.01);
    const max = screenWidth * (screenWidth < 728 ? 0.97 : 0.98);

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

    const min = screenWidth * (screenWidth < 728 ? 0.03 : 0.01);
    const max = screenWidth * (screenWidth < 728 ? 0.97 : 0.98);
    console.log("clampedWidth", x, min, max);
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
          setActiveVideo={setActiveVideo}
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
        className="fixed top-0 h-screen w-[30px] cursor-ew-resize z-10 flex justify-start"
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

      {activeVideo && (
        <div className="absolute z-50 top-0 left-0 flex items-center justify-center h-screen w-screen bg-black p-10">
          <video
            ref={videoRef}
            src={activeVideo.video}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-10 right-10 text-white text-4xl z-50 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* <p className="fixed bottom-16 left-10 z-30 font-karla text-sm">
        Based in Montréal
      </p>
      <p className="fixed bottom-16 right-10 z-30 font-karla text-sm">
        Local Time : {new Date().toLocaleTimeString()}
      </p> */}
      <p
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 text-red-500 z-30 mix-blend-difference text-sm  ${widthPercent !== 50 ? "opacity-0" : "opacity-50"} transform transition-opacity duration-300 ease-in-out `}
      >
        Drag the bar to reveal the content
      </p>
    </div>
  );
}
