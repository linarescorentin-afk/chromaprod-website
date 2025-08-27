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

function AboutPage() {
  const { setIsHomeAnimated, isNavBarAnimated, setIsNavBarAnimated } =
    useIsAnimated();
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
    </LenisProvider>
  );
}

export default AboutPage;
