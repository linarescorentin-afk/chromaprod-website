import { Canvas } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import VideoScene from "./VideoScene";
import { ScrollControls } from "@react-three/drei";
import { getVideos } from "@/sanity/lib/getVideo";
import VideoOverlay from "@/components/video/VideoOverlay";
import { useFilterStore } from "@/store/useFilterStore";
import { useIsLoading } from "@/store/useIsLoading";
import { R3FLoadingBridge } from "../loader/R3FLoadingBridge";
import { useIsAnimated } from "@/store/useIsAnimated";
import MobileVideoComponent from "../MobileVideoComponent";

export interface IVideo {
  title: string;
  description: string;
  video: string;
  thumbnail: string;
  clientName?: string;
  categories: string[];
}

function VideoComponent({
  isVideoVisible,
  moveBarTo,
  widthPercent,
  setActiveVideo,
}: {
  isVideoVisible: boolean;
  moveBarTo: (target: "video" | "photo") => void;
  widthPercent: number;
  setActiveVideo: Dispatch<SetStateAction<IVideo | null>>;
}) {
  const [videosFetched, setVideosFetched] = useState<IVideo[]>([]);
  const category = useFilterStore((state) => state.selectedFilter);
  const { setIsVideoLoading, setIsVideoCanvasLoading } = useIsLoading();
  const { setIsHomeAnimated, setIsNavBarAnimated } = useIsAnimated();

  useEffect(() => {}, []);

  useEffect(() => {
    async function load() {
      const videos = await getVideos();
      setVideosFetched(videos);
      setIsVideoLoading(false);
    }
    load();
  }, [setIsVideoLoading]);

  const onVideoClick = (video: IVideo) => {
    setIsHomeAnimated(false);
    setIsNavBarAnimated(false);
    moveBarTo("video");
    setTimeout(() => {
      setActiveVideo(video);
    }, 1500);
  };

  const videos = React.useMemo(() => {
    if (category === "all") return videosFetched;

    const filteredVideos = videosFetched.filter((v) =>
      v.categories.some((c) => c === category),
    );

    return filteredVideos;
  }, [videosFetched, category]);

  return (
    <div className="lg:h-screen w-screen">
      <div className={`bg-black w-[100vw] lg:h-screen hidden lg:block`}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          frameloop={isVideoVisible ? "always" : "demand"}
          className={`canvas ${isVideoVisible ? "visible" : "hidden"}`}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={videos.length + 0.5} damping={0.5}>
              <VideoScene
                onClick={onVideoClick}
                videos={videos}
                widthPercent={widthPercent}
              />
              <VideoOverlay videos={videos} />
            </ScrollControls>
          </Suspense>

          <R3FLoadingBridge onDone={() => setIsVideoCanvasLoading(false)} />
        </Canvas>
      </div>
      <div className="lg:hidden flex">
        <MobileVideoComponent
          isVideoVisible={isVideoVisible}
          onVideoClick={onVideoClick}
          videosFetched={videosFetched}
        />
      </div>
    </div>
  );
}

export default VideoComponent;
