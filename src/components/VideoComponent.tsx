import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";
import VideoScene from "./video/VideoScene";
import { ScrollControls } from "@react-three/drei";
import VideoOverlay from "./video/VideoOverlay";
import SwitchButton from "./ui/SwitchButton";

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
        video: "/video1.mp4",
        thumbnail: "/ph1.jpg",
        clientName: "Client 1",
        categories: ["Category 1", "Category 2"],
      },
      {
        title: "Video 2",
        description: "Description of Video 2",
        video: "/video2.mp4",
        thumbnail: "/ph3.jpg",
        clientName: "Client 2",
        categories: ["Category 2", "Category 3"],
      },
      {
        title: "Video 3",
        description: "Description of Video 3",
        video: "/video3.mp4",
        thumbnail: "/ph4.jpeg",
        clientName: "Client 3",
        categories: ["Category 3", "Category 4"],
      },
      {
        title: "Video 4",
        description: "Description of Video 4",
        video: "/video4.mp4",
        thumbnail: "/ph5.jpeg",
        clientName: "Client 4",
        categories: ["Category 4", "Category 5"],
      },
      {
        title: "Video 5",
        description: "Description of Video 5",
        video: "/video5.mp4",
        thumbnail: "/ph6.jpeg",
        clientName: "Client 5",
        categories: ["Category 5", "Category 6"],
      },
      {
        title: "Video 6",
        description: "Description of Video 6",
        video: "/video6.mp4",
        thumbnail: "/ph7.jpeg",
        clientName: "Client 6",
        categories: ["Category 6", "Category 7"],
      },
      {
        title: "Video 7",
        description: "Description of Video 7",
        video: "/video7.mp4",
        thumbnail: "/ph8.jpeg",
        clientName: "Client 7",
        categories: ["Category 7", "Category 8"],
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
