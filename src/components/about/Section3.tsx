import React from "react";
import AnimUp from "../ui/animated/AnimUp";
import Image from "next/image";
import { AboutSettings } from "@/sanity/types/about";
import { useInView } from "react-intersection-observer";

function Section3({ about }: { about: AboutSettings }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
  });
  return (
    <div
      ref={ref}
      className="flex flex-wrap gap-10 items-center justify-center px-5 lg:px-10"
    >
      {about.logoPartners.map((logo, index) => (
        <AnimUp inView={inView} duration={1} key={index}>
          <Image
            src={logo.url as string}
            alt="Partenaire"
            width={120}
            height={100}
          />
        </AnimUp>
      ))}
    </div>
  );
}

export default Section3;
