import { Canvas } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import VideoScene from "./video/VideoScene";
import { ScrollControls } from "@react-three/drei";
import SwitchButton from "./ui/SwitchButton";
import { getVideos } from "@/sanity/lib/getVideo";
import VideoOverlay from "@/components/video/VideoOverlay";
import { useFilterStore } from "@/store/useFilterStore";

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

  useEffect(() => {
    async function load() {
      const videos = await getVideos();
      setVideosFetched(videos);
    }
    load();
  }, []);

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
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        frameloop={isVideoVisible ? "always" : "demand"}
      >
        <color attach="background" args={["#121212"]} />
        <ScrollControls pages={videos.length + 0.5} damping={0.5}>
          <VideoScene
            onClick={onVideoClick}
            videos={videos}
            widthPercent={widthPercent}
          />
          <VideoOverlay videos={videos} widthPercent={widthPercent} />
        </ScrollControls>
      </Canvas>
      <div className="fixed bottom-10 lg:left-16 left-5 z-30">
        <SwitchButton
          onClick={() => moveBarTo("video")}
          subtext="Switch to video"
          textposition="text-left"
        />
      </div>
    </div>
  );
}

export default VideoComponent;
