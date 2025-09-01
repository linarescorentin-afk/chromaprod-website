"use client";
import { getAboutSettings } from "@/sanity/lib/getAboutSettings";
import { getSocialMedia, SocialMedia } from "@/sanity/lib/getSocialMedia";
import { AboutSettings } from "@/sanity/types/about";
import { useIsAnimated } from "@/store/useIsAnimated";
import React, { useEffect, useState } from "react";
import LenisProvider from "../LenisProvider";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section5 from "./Section5";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Image from "next/image";

function AboutPage() {
  const {
    setIsHomeAnimated,
    isNavBarAnimated,
    setIsNavBarAnimated,
    isAboutAnimated,
  } = useIsAnimated();
  const [socialMedia, setSocialMedia] = useState<SocialMedia[] | null>(null);
  const [about, setAbout] = useState<AboutSettings | null>(null);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      const data = await getSocialMedia();
      setSocialMedia(data);
    };

    const fetchAbout = async () => {
      const data = await getAboutSettings();
      setAbout(data);
    };

    setIsHomeAnimated(false);
    if (!isNavBarAnimated) {
      setIsNavBarAnimated(true);
    }
    fetchSocialMedia();
    fetchAbout();
  }, [setIsHomeAnimated, isNavBarAnimated, setIsNavBarAnimated]);

  if (!about || !socialMedia) return null;

  return (
    <LenisProvider>
      <div className="lg:pt-32 lg:pb-0 py-20 font-karla uppercase flex flex-col items-center space-y-20">
        {/* SECTION 1 */}
        <Section1 about={about} />
        <Section2 about={about} />
        <Section3 about={about} />
        <Section4 about={about} />
        <Section5 about={about} socialMedia={socialMedia} />
      </div>
      <div className="fixed bottom-8 space-y-2 z-30 left-1/2 -translate-x-1/2 font-karla text-[12px] h-[50px] overflow-hidden  mix-blend-difference hidden lg:flex   ">
        <div
          className={`flex flex-col items-center justify-center  transition-all ease-in-out transform duration-[1000ms] ${isAboutAnimated ? "translate-y-0" : "translate-y-full"}`}
        >
          <p>scroll down to Explore</p>
          <Image src="/downArrow.svg" alt="scroll down" width={5} height={5} />
        </div>
      </div>
    </LenisProvider>
  );
}

export default AboutPage;
