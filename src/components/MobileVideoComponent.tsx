import React, { RefObject, useEffect, useRef } from "react";
import { IVideo } from "./video/VideoComponent";
import { useIsLoading } from "@/store/useIsLoading";
import Image from "next/image";
import LenisProvider from "./LenisProvider";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { motion } from "framer-motion";
import { useItemParallax } from "@/hook/useItemParralax";

function MobileVideoComponent({
  videosFetched,
  onVideoClick,
  isVideoVisible,
}: {
  videosFetched: IVideo[];
  onVideoClick: (video: IVideo) => void;
  isVideoVisible: boolean;
}) {
  const { setIsVideoCanvasLoading } = useIsLoading();
  const { selectedLanguage } = useIsSelectedLanguage();

  useEffect(() => {
    setIsVideoCanvasLoading(false);
  }, [setIsVideoCanvasLoading]);

  return (
    <div
      className={`bg-black w-[100vw]  flex-col space-y-20 pt-20 ${isVideoVisible ? "flex" : "hidden"}`}
    >
      {videosFetched.map((video, index) => (
        <OneMobileVideo
          key={index}
          index={index}
          video={video}
          onVideoClick={onVideoClick}
          selectedLanguage={selectedLanguage}
        />
      ))}
    </div>
  );
}

export default MobileVideoComponent;

function OneMobileVideo({
  video,
  onVideoClick,
  selectedLanguage,
}: {
  video: IVideo;
  onVideoClick: (video: IVideo) => void;
  selectedLanguage: string;
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const y = useItemParallax(itemRef as RefObject<HTMLElement>, 0.15);

  return (
    <div
      ref={itemRef}
      key={video.title}
      className={`h-[500px] md:h-[600px] relative overflow-hidden`}
    >
      <div className=" w-full h-32 absolute inset-0 z-10 bg-linear-to-b from-black from-1% to-transparent to-100%" />
      <motion.div style={{ y }} className={`relative h-[150%] w-full`}>
        <Image
          src={video.thumbnail}
          alt={video.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </motion.div>
      <div className="space-y-2 absolute inset-0 font-karantina z-50 px-5 flex flex-col justify-end items-start">
        <button
          onClick={() => onVideoClick(video)}
          className="underline text-[30px]"
        >
          {selectedLanguage === "en" ? "WATCH VIDEO" : "VOIR LA VIDEO"}
        </button>
        <h1 className=" text-[80px] lg:text-[150px] font-bold uppercase leading-[70px] tracking-[0.02em] lg:leading-[120px]  w-full lg:w-[200px]">
          {video.title}
        </h1>
      </div>
      <div className=" w-full h-32 bottom-0 absolute z-10 bg-linear-to-b from-transparent from-1% to-black to-100%" />
    </div>
  );
}
