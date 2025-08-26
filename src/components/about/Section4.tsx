import { AboutSettings } from "@/sanity/types/about";
import { useIsAnimated } from "@/store/isHomeAnimated";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimUp from "../ui/animated/AnimUp";

function Section4({ about }: { about: AboutSettings }) {
  const { selectedLanguage } = useIsSelectedLanguage();
  const { isAboutAnimated } = useIsAnimated();
  const [duration, setDuration] = useState(1.5);
  const [isAnimated, setIsAnimated] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && isAboutAnimated) {
      setIsAnimated(true);
    }
    if (!isAboutAnimated && inView) {
      setDuration(5);
      setIsAnimated(false);
    }
  }, [inView, isAboutAnimated, setIsAnimated]);
  return (
    <div ref={ref} className="flex items-center justify-center py-10">
      {about.clientComments && (
        <div className="space-y-10 lg:flex lg:flex-wrap lg:items-start lg:w-6/12">
          {about.clientComments.map((comment, index) => (
            <AnimUp
              key={index}
              inView={isAnimated}
              duration={duration + index}
              y={500}
            >
              <div className="border-b lg:border-b-0 lg:border-l border-dashed  py-5 px-5 flex flex-col space-y-5 lg:h-fit justify-center">
                <p className="font-bold text-lg">{comment.name}</p>
                <p>
                  {selectedLanguage === "fr"
                    ? (comment.comment.fr as string)
                    : (comment.comment.en as string)}
                </p>
              </div>
            </AnimUp>
          ))}
        </div>
      )}
    </div>
  );
}

export default Section4;
