import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";
import VideoScene from "./video/VideoScene";
import { ScrollControls } from "@react-three/drei";
import VideoOverlay from "./video/VideoOverlay";
import SwitchButton from "./ui/SwitchButton";

export interface IVideo {
  title: string;
  description: string;
  src: string;
  thumbnail: string;
}

function VideoComponent({
  isVideoVisible,
  moveBarTo,
  widthPercent,
}: {
  isVideoVisible: boolean;
  moveBarTo: (target: "video" | "photo") => void;
  widthPercent: number;
}) {
  const videos = useMemo(
    () => [
      {
        title: "Video 1",
        description: "Description of Video 1",
        src: "/video1.mp4",
        thumbnail: "/ph1.jpg",
      },
      {
        title: "Video 2",
        description: "Description of Video 2",
        src: "/video2.mp4",
        thumbnail: "/ph3.jpg",
      },
      {
        title: "Video 3",
        description: "Description of Video 3",
        src: "/video3.mp4",
        thumbnail: "/ph4.jpeg",
      },
      {
        title: "Video 4",
        description: "Description of Video 4",
        src: "/video4.mp4",
        thumbnail: "/ph5.jpeg",
      },
      {
        title: "Video 5",
        description: "Description of Video 5",
        src: "/video5.mp4",
        thumbnail: "/ph6.jpeg",
      },
      {
        title: "Video 6",
        description: "Description of Video 6",
        src: "/video6.mp4",
        thumbnail: "/ph7.jpeg",
      },
      {
        title: "Video 7",
        description: "Description of Video 7",
        src: "/video7.mp4",
        thumbnail: "/ph8.jpeg",
      },
    ],
    [],
  );
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        frameloop={isVideoVisible ? "always" : "demand"}
      >
        <color attach="background" args={["#111"]} />
        <ScrollControls pages={7} damping={0.8}>
          <VideoScene videos={videos} widthPercent={widthPercent} />
          <VideoOverlay videos={videos} widthPercent={widthPercent} />
        </ScrollControls>
      </Canvas>
      <div className="fixed bottom-4 left-16 z-50">
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
