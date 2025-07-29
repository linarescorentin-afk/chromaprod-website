import { Canvas } from "@react-three/fiber";
import React, { useMemo } from "react";
import VideoScene from "./video/VideoScene";
import { ScrollControls } from "@react-three/drei";
import VideoOverlay from "./video/VideoOverlay";

function VideoComponent({
  isVideoVisible,
  moveBarTo,
}: {
  isVideoVisible: boolean;
  moveBarTo: (target: "video" | "photo") => void;
}) {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#111"]} />
        <ScrollControls pages={4} damping={0.8}>
          <VideoScene />
          <VideoOverlay />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default VideoComponent;
