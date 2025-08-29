import { useEffect, useState } from "react";
import { IVideo } from "./VideoComponent";
import { useIsAnimated } from "@/store/useIsAnimated";

interface IProps {
  activeVideo: IVideo;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setActiveVideo: (video: IVideo | null) => void;
}

function ActiveVideo({ activeVideo, videoRef, setActiveVideo }: IProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  const { setIsHomeAnimated, setIsNavBarAnimated } = useIsAnimated();

  useEffect(() => {
    setIsAnimated(true);
  }, [setIsHomeAnimated]);

  const onClose = () => {
    setIsAnimated(false);
    setTimeout(() => {
      setActiveVideo(null);
      setIsNavBarAnimated(true);
      setIsHomeAnimated(true);
    }, 1000);
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex flex-col items-center justify-center h-full w-full bg-black lg:p-10 lg:pt-5 p-2 ${isAnimated ? "opacity-100" : "opacity-0"} transition-opacity duration-[2000ms] h-screen`}
    >
      <div
        className={`${isAnimated ? "translate-y-0" : "-translate-y-100"} transition-all ease-in-out duration-[2000ms]  flex flex-row w-full items-end justify-between`}
      >
        <div
          className={`flex  flex-row w-full space-x-1 uppercase px-5 lg:px-0 items-center`}
        >
          <h3>{activeVideo.title} /</h3>
          {activeVideo.categories.map((cat) => (
            <h3 className="text-sm opacity-50" key={cat}>
              {cat}
            </h3>
          ))}
        </div>
        <div className={`w-full flex justify-end px-5 pt-4 `}>
          <button
            onClick={onClose}
            className="text-white text-sm z-50 cursor-pointer border-b hover:font-bold  transition-all duration-500"
          >
            CLOSE X
          </button>
        </div>
      </div>
      <video
        src={`${activeVideo.video}#t=0.001`}
        ref={videoRef}
        controls
        autoPlay={isAnimated}
        className={`w-full h-full z-50 object-contain ${isAnimated ? "opacity-100" : "opacity-0"} transition-all duration-[2000ms] ease-in-out`}
      />
    </div>
  );
}

export default ActiveVideo;
