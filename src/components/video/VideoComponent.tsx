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
import { useVideoAndPhotoQuantity } from "@/store/useVideoAndPhotoQuantity";
import { CanvasErrorBoundary } from "../ui/CanvasErrorBoundary";

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
  const { setVideoQuantity } = useVideoAndPhotoQuantity();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoCanvasLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setIsVideoCanvasLoading]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsVideoCanvasLoading(false);
    }
    async function load() {
      try {
        const videos = await getVideos();
        setVideosFetched(videos);
        setVideoQuantity(videos.length);
      } catch (err) {
        console.error("Failed to load videos:", err);
      } finally {
        setIsVideoLoading(false);
        if (window.innerWidth < 1024) {
          setIsVideoCanvasLoading(false);
        }
      }
    }
    load();
  }, [setIsVideoLoading, setIsVideoCanvasLoading, setActiveVideo, setVideoQuantity]);

  // ✅ gère le clic sur une vidéo

  const onVideoClick = (video: IVideo) => {
    setIsHomeAnimated(false);
    setIsNavBarAnimated(false);
    moveBarTo("video");
    setTimeout(() => {
      setActiveVideo(video);
    }, 1500);
  };

  const videos = React.useMemo(() => {
    if (!category || category === "all") return videosFetched;

    const filteredVideos = videosFetched.filter((v) =>
      v.categories?.some((c) => c.toLowerCase() === category.toLowerCase()),
    );

    return filteredVideos;
  }, [videosFetched, category]);

  return (
    <div className="lg:h-screen w-screen">
      {isDesktop && (
        <div className={`bg-black w-[100vw] lg:h-screen hidden lg:block`}>
          <CanvasErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              frameloop={isVideoVisible ? "always" : "demand"}
              className={`canvas ${isVideoVisible ? "visible" : "hidden"}`}
            >
              <Suspense fallback={null}>
                <ScrollControls pages={videos.length + 0.2} damping={0.2}>
                  <VideoScene
                    onClick={onVideoClick}
                    videos={videos}
                    widthPercent={widthPercent}
                  />
                  <VideoOverlay videos={videos} />
                </ScrollControls>
                <R3FLoadingBridge onDone={() => setIsVideoCanvasLoading(false)} />
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      )}
      <div className="lg:hidden flex">
        <MobileVideoComponent
          isVideoVisible={isVideoVisible}
          onVideoClick={onVideoClick}
          videosFetched={videos}
        />
      </div>
    </div>
  );
}

export default VideoComponent;
