import { ServiceItem } from "@/sanity/types/about";
import AnimUp from "../ui/animated/AnimUp";
import Image from "next/image";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { useIsAnimated } from "@/store/useIsAnimated";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

function OneServices({ service }: { service: ServiceItem }) {
  const { selectedLanguage } = useIsSelectedLanguage();
  const { isAboutAnimated } = useIsAnimated();
  const [duration, setDuration] = useState(2);
  const [isAnimated, setIsAnimated] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (isAboutAnimated) {
      setIsAnimated(true);
    }
    if (!isAboutAnimated) {
      setDuration(5);
      setIsAnimated(false);
    }
  }, [inView, isAboutAnimated, setIsAnimated]);

  return (
    <div
      ref={ref}
      className={`border-y border-dashed space-y-5 opacity-100 flex flex-col px-5 lg:flex-row justify-between overflow-hidden sticky top-0 bg-black py-32 ${!isAnimated && "border-none"}`}
    >
      <AnimUp inView={isAnimated} duration={duration} y={500}>
        <h3 className="font-bold text-xl">
          {selectedLanguage === "fr" ? service.title.fr : service.title.en}
        </h3>
      </AnimUp>

      <AnimUp
        inView={isAnimated}
        duration={duration}
        y={500}
        className="relative"
      >
        {service.image && (
          <Image
            src={service.image.url as string}
            alt={service.title.fr ? service.title.fr : ""}
            width={500}
            height={500}
          />
        )}
      </AnimUp>

      <div className="lg:w-4/12">
        <AnimUp inView={isAnimated} duration={duration} y={500}>
          <p>{selectedLanguage === "fr" ? service.text.fr : service.text.en}</p>
        </AnimUp>
      </div>
    </div>
  );
}

export default OneServices;
