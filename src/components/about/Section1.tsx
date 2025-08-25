import AnimUp from "../ui/animated/AnimUp";
import { useInView } from "react-intersection-observer";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { AboutSettings } from "@/sanity/types/about";
import Image from "next/image";

function Section1({ about }: { about: AboutSettings }) {
  const { selectedLanguage } = useIsSelectedLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="-translate-y-10 lg:translate-y-0">
      <div className="flex flex-col lg:flex-row lg:items-start">
        <div className="flex flex-col justify-between h-full  lg:min-h-[80vh] lg:w-12/12 lg:pl-5">
          <AnimUp
            inView={inView}
            duration={2.5}
            y={250}
            className="h-[250px] md:h-fit"
          >
            <h1 className="font-karantina text-[100px] md:text-[150px] leading-[80px] md:leading-[120px]   px-5 translate-y-20 md:translate-y-0 md:min-w-[800px]">
              {selectedLanguage === "fr"
                ? about.h1.fr?.toUpperCase()
                : about.h1.en?.toUpperCase()}
            </h1>
          </AnimUp>
          <AnimUp inView={inView} duration={3.5}>
            <h2 className="mt-10 w-8/12 border-b pb-10  px-5 hidden lg:flex">
              {selectedLanguage === "fr" ? about.h2.fr : about.h2.en}
            </h2>
          </AnimUp>
        </div>
        <div className="flex flex-col items-end space-y-2 w-full h-[90vh] ">
          <div
            className={`relative w-full h-full ${inView ? "translate-x-0" : "translate-x-full"} transition-all ease-in-out duration-[3500ms]`}
          >
            <Image
              layout="fill"
              objectFit="cover"
              className="mt-10 lg:mt-0"
              src={
                about.heroPortrait
                  ? (about.heroPortrait.url as string)
                  : "/corentinlinares.webp"
              }
              alt="corentinlinares"
            />
          </div>
          <h3 className="w-10/12  italic text-sm  px-5 lg:w-full  pt-10">
            {selectedLanguage === "fr" ? about.h3.fr : about.h3.en}
          </h3>
        </div>
      </div>
      <h2 className="mt-10 w-8/12 border-b pb-10  px-5 lg:hidden">
        {selectedLanguage === "fr" ? about.h2.fr : about.h2.en}
      </h2>
    </div>
  );
}

export default Section1;
