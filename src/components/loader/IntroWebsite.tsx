"use client";
import { useIsLoading } from "@/store/useIsLoading";
import Image from "next/image";
import React, { useEffect } from "react";
import ComeUpText from "../ui/animated/ComeUpText";
import AnimUp from "../ui/animated/AnimUp";
import { usePathname } from "next/navigation";
import { useIsEnterState } from "@/store/useIsEnter";

function IntroWebsite() {
  const { getAllReady } = useIsLoading();
  const { isEnter, setIsEnter } = useIsEnterState();
  const [inView, setInView] = React.useState(false);

  const path = usePathname();

  useEffect(() => {
    setInView(true);
    if (path === "/studio") {
      setIsEnter(true);
    }
  }, [path, setIsEnter]);

  const onClose = () => {
    setInView(false);
    setTimeout(() => {
      setIsEnter(true);
    }, 1100);
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center bg-black fixed top-0 left-0 z-50 ${isEnter && "hidden"} ${!inView && "animate-translateTop"}`}
    >
      <div
        className={`absolute z-50 top-0 animate-fadeIn left-0 flex items-center justify-center h-screen w-screen bg-black lg:p-10 p-2 ${inView && "fadeIn"}`}
      >
        <video
          src={`/nuitMontreal.mov`}
          controls={false}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-fill rounded-3xl"
        />
      </div>
      <div className="z-[100] flex flex-col items-center justify-center font-karla font-bold space-y-10 pt-32">
        <AnimUp inView={inView} duration={2.5}>
          <Image
            src="/chomaLogoCenter.webp"
            alt="Logo"
            width={570}
            height={100}
          />
        </AnimUp>
        {/* <div className="space-y-3 items-center flex flex-col">
          <AnimUp inView={inView} duration={3.8}>
            <h2 className="text-lg">VIDEO MAKING & PHOTOGRAPHY</h2>
          </AnimUp>
          <AnimUp inView={inView} duration={3.5}>
            <h3 className="text-sm">BASED IN MONTRÉAL</h3>
          </AnimUp>
        </div> */}
        <AnimUp inView={inView} duration={3.8}>
          <div className="bg-white py-2 px-8 text-black border-x-2 group border-dashed border-black font-karantina  text-2xl cursor-pointer">
            {getAllReady() ? (
              <button
                className="w-full h-full cursor-pointer group-hover:scale-110 transition-all transform ease-in-out duration-500"
                onClick={() => onClose()}
              >
                <ComeUpText height="h-8" text="START THE EXPERIENCE" />
              </button>
            ) : (
              <p>LOADING...</p>
            )}
          </div>
        </AnimUp>
      </div>

      {/* Page Intro
      {getAllReady() ? (
        <button onClick={() => setIsEnter(true)}>Enter in the Website</button>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default IntroWebsite;
