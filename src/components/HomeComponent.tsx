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

  const getWidth = (side: "left" | "right") => {
    if (activeSide === "basic") return "50%";
    if (activeSide === side) return `${50 + progress * 50}%`;
    return `${50 - progress * 50}%`;
  };

  useEffect(() => {
    const el = leftRef.current;
    const handleScroll = () => {
      if (!el) return;
      const top = el.scrollTop;
      setScrollY(top);
      setActiveSide("left");
    };
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = rightRef.current;
    const handleScroll = () => {
      if (!el) return;
      const top = el.scrollTop;
      setScrollY(top);
      setActiveSide("right");
      if (top === 0) setActiveSide("basic");
    };
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden font-sans">
      {/* Left Panel */}
      <div
        ref={leftRef}
        className={`absolute top-0 left-0 h-full bg-black text-white scroll-smooth overflow-y-scroll no-scrollbar transition-all duration-300 ease-in-out p-5 ${
          activeSide === "right" ? "z-0" : "z-10"
        }`}
        style={{ width: getWidth("left") }}
      >
        <VideoComponent />
        <div className="h-[200vh]" />
      </div>

      {/* Right Panel */}
      <div
        ref={rightRef}
        className={`absolute top-0 right-0 h-full bg-neutral-900 text-white scroll-smooth overflow-x-scroll no-scrollbar transition-all duration-300 ease-in-out p-5 pl-0 w-full `}
      >
        <PhotoComponent />
        <div className="h-[200vh]" />
      </div>

      {/* Debug Panel */}
      <div className="absolute bottom-4 left-4 bg-white text-black px-3 py-1 rounded text-sm z-50 shadow">
        ScrollY: {scrollY.toFixed(0)}px | Active: {activeSide}
      </div>
    </div>
  );
}
