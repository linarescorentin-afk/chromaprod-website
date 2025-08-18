import { Canvas } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import VideoScene from "./video/VideoScene";
import { ScrollControls } from "@react-three/drei";
import { getVideos } from "@/sanity/lib/getVideo";
import VideoOverlay from "@/components/video/VideoOverlay";
import { useFilterStore } from "@/store/useFilterStore";
import { useIsLoading } from "@/store/useIsLoading";
import { R3FLoadingBridge } from "./loader/R3FLoadingBridge";
import { useIsEnterState } from "@/store/useIsEnter";

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
  const { isEnter } = useIsEnterState();
  const [videosFetched, setVideosFetched] = useState<IVideo[]>([]);
  const category = useFilterStore((state) => state.selectedFilter);
  const { setIsVideoLoading, setIsVideoCanvasLoading } = useIsLoading();

  useEffect(() => {
    async function load() {
      const videos = await getVideos();
      setVideosFetched(videos);
      setIsVideoLoading(false);
    }
    load();
  }, [setIsVideoLoading]);

  const onVideoClick = (video: IVideo) => {
    moveBarTo("video");
    setActiveVideo(video);
  };

  const videos = React.useMemo(() => {
    if (category === "all") return videosFetched;

    const filteredVideos = videosFetched.filter((v) =>
      v.categories.some((c) => c === category),
    );

    return filteredVideos;
  }, [videosFetched, category]);

  if (!videos.length) {
    return <div className="text-white p-4">Chargement des vidéos...</div>;
  }

  return (
    <div
      className={`bg-black w-[100svw] h-screen ${isEnter ? "translate-x-0 opacity-100" : "translate-x-[50%] opacity-0"} transition-all transform ease-in-out duration-[3000ms] `}
    >
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
            <VideoOverlay videos={videos} widthPercent={widthPercent} />
          </ScrollControls>
        </Suspense>

        <R3FLoadingBridge onDone={() => setIsVideoCanvasLoading(false)} />
      </Canvas>
    </div>
  );
}

export default VideoComponent;
