"use client";

import { useEffect, useRef, useState } from "react";
import VideoComponent from "./VideoComponent";
import PhotoComponent from "./PhotoComponent";

type ScrollSide = "basic" | "left" | "right";

export default function HomeComponent() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSide, setActiveSide] = useState<ScrollSide>("basic");

  const maxScroll = 150;
  const progress = Math.min(scrollY / maxScroll, 1);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Widths (desktop) or Heights (mobile)
  const videoSize =
    activeSide === "left"
      ? `${50 + progress * 50}${isMobile ? "vh" : "%"}`
      : activeSide === "right"
        ? `${50 - progress * 50}${isMobile ? "vh" : "%"}`
        : isMobile
          ? "50vh"
          : "50%";

  const photoSize =
    activeSide === "right"
      ? `${50 + progress * 50}${isMobile ? "vh" : "%"}`
      : activeSide === "left"
        ? `${50 - progress * 50}${isMobile ? "vh" : "%"}`
        : isMobile
          ? "50vh"
          : "50%";

  // Scroll handlers
  useEffect(() => {
    const el = leftRef.current;
    const handleScroll = () => {
      if (!el) return;
      setScrollY(el.scrollTop);
      setActiveSide("left");
    };
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = rightRef.current;
    const handleScroll = () => {
      if (!el) return;
      setScrollY(el.scrollTop);
      setActiveSide("right");
      if (el.scrollTop === 0) setActiveSide("basic");
    };
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-screen h-screen overflow-hidden font-sans flex ${
        isMobile ? "flex-col" : ""
      }`}
    >
      {/* Video (Top on Mobile, Left on Desktop) */}
      <div
        ref={leftRef}
        className={`${
          isMobile
            ? "w-full transition-[height] duration-700 ease-in-out"
            : "h-full transition-[width] duration-700 ease-in-out absolute top-0 left-0"
        } bg-black text-white overflow-y-scroll no-scrollbar p-5 z-10`}
        style={isMobile ? { height: videoSize } : { width: videoSize }}
      >
        <div className="sticky top-0 bg-red-600 opacity-50 p-4">
          <h1 className="text-4xl font-bold mb-4">🎬 VIDEO</h1>
          <p className="mb-8">Scroll to expand this section</p>
        </div>
        {/* <VideoComponent /> */}
        <div className="h-[500vh]" />
      </div>

      {/* Photo (Bottom on Mobile, Right on Desktop) */}
      <div
        ref={rightRef}
        className={`${
          isMobile
            ? "w-full transition-[height] duration-700 ease-in-out"
            : "h-full transition-[width] duration-700 ease-in-out absolute top-0 right-0"
        } bg-neutral-900 text-white overflow-y-scroll no-scrollbar p-5  z-10`}
        style={isMobile ? { height: photoSize } : { width: photoSize }}
      >
        <div className="sticky top-0 bg-red-600 opacity-50 p-4 text-right">
          <h1 className="text-4xl font-bold mb-4">📷 PHOTO</h1>
          <p className="mb-8">Scroll to expand this section</p>
        </div>
        {/* <PhotoComponent /> */}
        <div className="h-[500vh]" />
      </div>

      {/* Debug */}
      <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-1 rounded text-sm z-50 shadow">
        ScrollY: {scrollY.toFixed(0)}px | Active: {activeSide}
      </div>
    </div>
  );
}
