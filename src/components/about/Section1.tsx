import AnimUp from "../ui/animated/AnimUp";
import { useInView } from "react-intersection-observer";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { AboutSettings } from "@/sanity/types/about";
import Image from "next/image";
import { useIsAnimated } from "@/store/isHomeAnimated";
import { useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import useParallax from "@/hook/useParallax";

function Section1({ about }: { about: AboutSettings }) {
  const { selectedLanguage } = useIsSelectedLanguage();
  const { isAboutAnimated, setIsAboutAnimated } = useIsAnimated();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 0, 550);

  useEffect(() => {
    if (inView) {
      setIsAboutAnimated(true);
    }
  }, [inView, setIsAboutAnimated]);

  return (
    <div ref={ref} className="-translate-y-10 lg:translate-y-0">
      <div className="flex flex-col lg:flex-row lg:items-start">
        <div className="flex flex-col justify-between h-full  lg:min-h-[80vh] lg:w-12/12 lg:pl-5 pt-10">
          <AnimUp
            inView={isAboutAnimated}
            duration={2.5}
            y={250}
            className="md:h-fit"
          >
            <h1 className="font-karantina text-[100px] md:text-[150px] leading-[80px] md:leading-[120px] px-5">
              {selectedLanguage === "fr"
                ? about.h1.fr?.toUpperCase()
                : about.h1.en?.toUpperCase()}
            </h1>
          </AnimUp>
          <AnimUp inView={isAboutAnimated} duration={3.5} y={250}>
            <h2 className="mt-10 w-8/12 border-b pb-10  px-5 hidden lg:flex">
              {selectedLanguage === "fr" ? about.h2.fr : about.h2.en}
            </h2>
          </AnimUp>
        </div>
        <div className="flex flex-col items-end lg:justify-end space-y-2 w-full h-[100vh]">
          <div
            className={`relative w-full h-full lg:absolute lg:w-5/12 lg:top-0 lg:h-[100vh] lg:-translate-y-20 ${isAboutAnimated ? "translate-x-0" : "translate-x-full"} transition-all ease-in-out duration-[3500ms] overflow-hidden`}
          >
            <motion.div
              style={{ y }}
              className={`relative h-[110%] w-[105%] lg:w-[105%] `}
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={
                  about.heroPortrait
                    ? (about.heroPortrait.url as string)
                    : "/corentinlinares.webp"
                }
                alt="corentinlinares"
              />
            </motion.div>
          </div>
          <AnimUp inView={isAboutAnimated} duration={4} y={250}>
            <h3 className="w-10/12  italic text-sm  px-5 lg:w-full  pt-10">
              {selectedLanguage === "fr" ? about.h3.fr : about.h3.en}
            </h3>
          </AnimUp>
        </div>
      </div>
      <AnimUp inView={isAboutAnimated} duration={4} y={250}>
        <h2 className="mt-10 w-8/12 border-b pb-10  px-5 lg:hidden">
          {selectedLanguage === "fr" ? about.h2.fr : about.h2.en}
        </h2>
      </AnimUp>
    </div>
  );
}

export default Section1;
