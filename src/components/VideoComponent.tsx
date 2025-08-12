import { Canvas } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import VideoScene from "./video/VideoScene";
import { ScrollControls } from "@react-three/drei";
import SwitchButton from "./ui/SwitchButton";
import { getVideos } from "@/sanity/lib/getVideo";
import VideoOverlay from "@/components/video/VideoOverlay";

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
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    async function load() {
      const videos = await getVideos();
      setVideos(videos);
    }
    load();
  }, []);

  const onVideoClick = (video: IVideo) => {
    moveBarTo("video");
    setActiveVideo(video);
  };

  if (!videos.length) {
    return <div className="text-white p-4">Chargement des vidéos...</div>;
  }

  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        frameloop={isVideoVisible ? "always" : "demand"}
      >
        <color attach="background" args={["#111"]} />
        <ScrollControls pages={videos.length + 0.5} damping={0.5}>
          <VideoScene
            onClick={onVideoClick}
            videos={videos}
            widthPercent={widthPercent}
          />
          <VideoOverlay videos={videos} widthPercent={widthPercent} />
        </ScrollControls>
      </Canvas>
      <div className="fixed bottom-4 left-16 z-30">
        <SwitchButton
          onClick={() => moveBarTo("video")}
          text="VIDEO"
          subtext="Switch to video"
          isVisible={isVideoVisible}
          textposition="text-left"
        />
      </div>
    </div>
  );
}

export default VideoComponent;
