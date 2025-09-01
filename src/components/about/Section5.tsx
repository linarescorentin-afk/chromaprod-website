import { SocialMedia } from "@/sanity/lib/getSocialMedia";
import { AboutSettings } from "@/sanity/types/about";
import { useIsAnimated } from "@/store/useIsAnimated";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AnimUp from "../ui/animated/AnimUp";

function Section5({
  about,
  socialMedia,
}: {
  about: AboutSettings;
  socialMedia: SocialMedia[] | null;
}) {
  const { selectedLanguage } = useIsSelectedLanguage();
  const [isAnimated, setIsAnimated] = React.useState(false);
  const { isAboutAnimated } = useIsAnimated();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (isAboutAnimated) {
      setIsAnimated(true);
    }
    if (!isAboutAnimated) {
      setIsAnimated(false);
    }
  }, [inView, isAboutAnimated, setIsAnimated]);

  return (
    <div ref={ref} className="flex flex-col lg:flex-row  w-full ">
      <div className="px-5 lg:px-10 space-y-10 w-full lg:w-6/12 lg:py-20">
        <div className="space-y-5">
          <AnimUp inView={isAnimated} duration={1.5}>
            <h2 className="font-karantina text-[100px] leading-[80px]">
              {selectedLanguage === "fr"
                ? "COMMENT POUVONS NOUS AIDER ?"
                : "LET'S WORK TOGETHER"}
            </h2>
          </AnimUp>
          <AnimUp inView={isAnimated} duration={1.5}>
            <Link href="/contact">
              <button className="border font-karantina text-4xl border-black px-5 py-2 bg-white text-black">
                {selectedLanguage === "fr"
                  ? "CONTACTER NOUS"
                  : "LET'S WORK TOGETHER"}
              </button>
            </Link>
          </AnimUp>
        </div>
        <div className="space-y-5">
          <AnimUp inView={isAnimated} duration={1.5}>
            <h3>Corentin Linares</h3>
          </AnimUp>
          <AnimUp inView={isAnimated} duration={1.5}>
            <h3>Video Making & Photography</h3>
          </AnimUp>
        </div>

        <div className="space-y-2 flex flex-col">
          {socialMedia &&
            socialMedia.map((soc, key) => (
              <AnimUp inView={isAnimated} duration={1.5} key={key}>
                <a
                  className="underline"
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4>{soc.platform}</h4>
                </a>
              </AnimUp>
            ))}
        </div>
        <AnimUp inView={isAnimated} duration={1.5}>
          <span className="text-xs">
            WEBSITE develop & DESIGN BY THOMAS BARRIAL
          </span>
        </AnimUp>
      </div>
      <div
        className={`lg:w-6/12 hidden lg:flex bg-red-600 relative ${!isAboutAnimated ? "translate-x-full" : "translate-x-0"} transition-all ease-in-out duration-[2500ms]`}
      >
        <Image
          src={about.contactSideImage?.url || "/mtlcontact.webp"}
          alt="Contact"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default Section5;
