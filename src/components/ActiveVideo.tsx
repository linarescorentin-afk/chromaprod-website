import { useState } from "react";
import { IVideo } from "./VideoComponent";

interface IProps {
  activeVideo: IVideo;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setActiveVideo: (video: IVideo | null) => void;
}

function ActiveVideo({ activeVideo, videoRef, setActiveVideo }: IProps) {
  const [isClose, setIsClose] = useState(false);

  const onClose = () => {
    setIsClose(true);
    setTimeout(() => {
      setActiveVideo(null);
      setIsClose(false);
    }, 2000);
  };

  console.log(isClose);
  return (
    <div
      className={`absolute z-50 top-0 left-0 flex items-center justify-center h-full w-full bg-black lg:p-10 p-2 animate-translateBottom ${isClose && "animate-translateTop"}`}
    >
      <video
        src={`${activeVideo.video}#t=0.001`}
        ref={videoRef}
        // controls
        autoPlay={!isClose}
        className="w-full h-full object-contain"
      />
      <button
        onClick={onClose}
        className="absolute top-10 right-10 text-white text-4xl z-50 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}

export default ActiveVideo;
