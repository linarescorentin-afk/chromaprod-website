"use client";

import { useEffect, useRef, useState } from "react";
import PhotoComponent from "./photo/PhotoComponent";
import VideoComponent, { IVideo } from "./video/VideoComponent";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useWindowsWidth } from "@/store/useWindowsWidth";
import SwitchButton from "./ui/SwitchButton";
import SocialMediaComponent from "./SocialMediaComponent";
import ActiveVideo from "./video/ActiveVideo";
import AnimUp from "./ui/animated/AnimUp";
import { useIsAnimated } from "@/store/useIsAnimated";

export default function HomeComponent() {
  const { isHomeAnimated } = useIsAnimated();
  const dragX = useMotionValue(0);
  const [widthPercent, setWidthPercent] = useState(50);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isPhotoVisible, setIsPhotoVisible] = useState(true);
  const [activeVideo, setActiveVideo] = useState<IVideo | null>(null);
  const { setWindowWidth, windowWidth } = useWindowsWidth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isMobile = windowWidth < 728;

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

    if (isMobile) {
      dragX.set(window.innerWidth * 0.98);
    }
    // Écoute dragX pour calculer le % en direct
    const unsubscribe = dragX.on("change", (latest) => {
      setIsDragging(true);
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

    const destroy = dragX.on("animationComplete", () => {
      setIsDragging(false);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
      destroy();
    };
  }, [dragX, isMobile, screenWidth]);

  // ✅ Fonction pour “auto-drag” la barre
  function moveBarTo(target: "video" | "photo") {
    if (!screenWidth) return;
    const min = screenWidth * 0.015;
    const max = screenWidth * 0.985;

    const targetX = target === "video" ? max : min;

    // ✅ Framer Motion anime automatiquement la value
    animate(dragX, targetX, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    });
  }

  const splitedSentence = "_ VIDEO _ PHOTOGRAPHY _".split("");

  // ✅ Clamp la largeur SEULEMENT si screenWidth est défini
  const clampedWidth = useTransform(dragX, (x) => {
    if (!screenWidth) return x; // le temps que le SSR soit hydraté

    const min = screenWidth * 0.015;
    const max = screenWidth * 0.985;
    return Math.min(Math.max(x, min), max);
  });

  const clip = useMotionTemplate`inset(0 calc(100% - ${clampedWidth}px) 0 0)`;

  console.log(isMobile);

  return (
    <div>
      {/* SECTION VIDEO */}
      <motion.div
        className={`absolute top-0 bg-black z-10 will-change-[clip-path] video-pane animate-left overflow-hidden`}
        style={{ clipPath: clip }}
      >
        {/* {widthPercent * 0.01 <= 0.92 && (
          <button
            className={`bg-transparent ${!isDragging && "hover:bg-white/10"} transform transition-all ease-in-out duration-300 absolute top-0 w-full h-full z-30 cursor-pointer`}
            onClick={() => moveBarTo("video")}
          />
        )} */}

        <VideoComponent
          setActiveVideo={setActiveVideo}
          isVideoVisible={isVideoVisible}
          moveBarTo={moveBarTo}
          widthPercent={widthPercent}
        />
        <div
          className={`
        absolute inset-0 z-10 bg-black
        ${isHomeAnimated ? "-translate-x-[100%] pointer-events-none" : "translate-x-[0%]"}
        transition-all ease-in-out duration-[3000ms]
      `}
        />
      </motion.div>
      <div className="relative overflow-x-hidden">
        {/* {widthPercent * 0.01 >= 0.015 && (
          <button
            className={`fixed top-0 w-full bg-transparent ${!isDragging && "hover:bg-white/10"} transform transition-all ease-in-out duration-300 h-full z-10 cursor-pointer`}
            onClick={() => moveBarTo("photo")}
          />
        )} */}

        {/* SECTION PHOTO */}
        <PhotoComponent
          isPhotoVisible={isPhotoVisible}
          widthPercent={widthPercent}
        />
        <div
          className={`
        absolute inset-0 z-10 bg-black
        ${isHomeAnimated ? "translate-x-[100%] pointer-events-none" : "translate-x-[0%]"}
        transition-all ease-in-out duration-[3000ms]
      `}
        />
      </div>

      {/* BARRE DRAGGABLE */}
      <motion.div
        drag={isMobile ? false : "x"}
        dragConstraints={{
          left: screenWidth ? screenWidth * 0.015 : 0,
          right: screenWidth ? screenWidth * 0.985 : 1000,
        }}
        onDrag={(e, info) => {
          if (!screenWidth) return;
          const min = screenWidth * 0.015;
          const max = screenWidth * 0.985;
          dragX.set(Math.min(Math.max(info.point.x, min), max));
        }}
        style={{ x: dragX }}
        className={`fixed top-0 h-screen w-[40px] cursor-ew-resize z-30 flex justify-center -translate-x-5 `}
      >
        <div
          className={`w-[2px] bg-red-900 hover:bg-red-600 hover:scale-150 transform transition-all duration-300 ease-in-out ${isHomeAnimated ? "h-full" : "h-1 -translate-y-10"} transition-all ease-in-out duration-[2000ms]`}
        />
        <Image
          src="/doublearrow.svg"
          height={100}
          width={100}
          alt="arrow"
          className={`absolute transform -translate-x-[21px] translate-y-full top-21 left-1/2 pointer-events-none ${isHomeAnimated ? "opacity-100" : "opacity-0"} transition-all *:ease-in-out duration-[2000ms]`}
        />
        <Image
          src="/doublearrow.svg"
          height={100}
          width={100}
          alt="arrow"
          className={`absolute transform -translate-x-[21px] -translate-y-1/2 bottom-26 lg:bottom-21 left-1/2 pointer-events-none ${isHomeAnimated ? "opacity-100" : "opacity-0"} transition-all *:ease-in-out duration-[2000ms]`}
        />
        <AnimUp
          duration={2}
          inView={isHomeAnimated}
          className={` min-w-[112px]  lg:min-w-[110px] group fixed bottom-28 lg:bottom-23  lg:right-1/2 -translate-x-[25px]  lg:-translate-x-[32px] right-5 z-30  text-xl  text-right  lg:transparent`}
        >
          <SwitchButton
            onClick={() => {
              moveBarTo("photo");
            }}
            subtext="Switch to photo"
          />
        </AnimUp>
        <AnimUp
          duration={2}
          inView={isHomeAnimated}
          className={` min-w-[120px] lg:min-w-[110px] group fixed bottom-28 lg:bottom-23 lg:left-1/2 translate-x-[25px] lg:translate-x-[35px] left-5 z-30  text-xl  text-left`}
        >
          <SwitchButton
            onClick={() => {
              moveBarTo("video");
            }}
            subtext="Switch to video"
          />
        </AnimUp>
      </motion.div>
      {activeVideo && (
        <ActiveVideo
          activeVideo={activeVideo}
          videoRef={videoRef}
          setActiveVideo={setActiveVideo}
        />
      )}

      <p
        className={`hidden lg:flex fixed bottom-12 left-10  z-30 mix-blend-difference text-xs font-karla text-center ${isHomeAnimated ? "translate-y-0" : "translate-y-[500%]"} transition-all transform ease-in-out duration-[3000ms] `}
      >
        - BASED IN MONTRÉAL
      </p>

      <p
        className={`hidden lg:flex fixed bottom-12 right-10  z-30 mix-blend-difference text-xs font-karla text-center ${isHomeAnimated ? "translate-y-0" : "translate-y-[500%]"} transition-all transform ease-in-out duration-[3000ms]`}
      >
        CORENTIN LINARES
      </p>

      <SocialMediaComponent />

      <div
        className={`fixed left-10 top-1/2 font-karla -translate-y-1/2 z-20 hidden lg:flex flex-col items-center text-[12px] ${isHomeAnimated ? "translate-x-0" : "-translate-x-[900%]"} transition-all transform ease-in-out duration-[3000ms]`}
      >
        {splitedSentence.map((w, i) => {
          return (
            <span key={i} className="text-white">
              {w}
            </span>
          );
        })}
      </div>

      <div className="fixed bottom-8 space-y-2 z-30 left-1/2 -translate-x-1/2 font-karla text-[12px] h-[50px] overflow-hidden  mix-blend-difference hidden lg:flex   ">
        <div
          className={`flex flex-col items-center justify-center ${(2 >= widthPercent || widthPercent >= 95) && isHomeAnimated ? "translate-y-0" : "translate-y-full"} transition-all ease-in-out transform duration-[1000ms]`}
        >
          <p>scroll down to Explore</p>
          <Image src="/downArrow.svg" alt="scroll down" width={5} height={5} />
        </div>
      </div>
      <div className="fixed top-20 left-5 z-30 flex flex-row space-x-5 font-karantina text-[28px] leading-[25px] lg:hidden">
        <button
          className={`${isVideoVisible ? "" : "opacity-50"} text-red-500  underline transition-all duration-500 ease-in-out`}
          onClick={() => moveBarTo("video")}
        >
          VIDEOS(64)
        </button>
        <button
          className={`${isPhotoVisible ? "" : "opacity-50"} text-red-500 underline transition-all duration-500 ease-in-out`}
          onClick={() => moveBarTo("photo")}
        >
          PHOTO(82)
        </button>
      </div>
    </div>
  );
}
