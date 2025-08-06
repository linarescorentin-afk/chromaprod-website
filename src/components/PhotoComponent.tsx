import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useMemo, useState } from "react";
import PhotoScene from "./photo/PhotoScene";
import SwitchButton from "./ui/SwitchButton";

function PhotoComponent({
  isPhotoVisible,
  moveBarTo,
  widthPercent,
}: {
  isPhotoVisible: boolean;
  moveBarTo: (target: "video" | "photo") => void;
  widthPercent: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const photos = useMemo(
    () => [
      "/ph1.jpg",
      "/ph3.jpg",
      "/ph4.jpeg",
      "/ph5.jpeg",
      "/ph6.jpeg",
      "/ph7.jpeg",
      "/ph8.jpeg",
    ],
    [],
  );
  return (
    <div className="h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        frameloop={isPhotoVisible ? "always" : "demand"}
      >
        <color attach="background" args={["#111"]} />
        <ScrollControls pages={8} damping={0.5}>
          <PhotoScene
            photos={photos}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            widthPercent={widthPercent}
          />
        </ScrollControls>
      </Canvas>
      {/* ✅ Overlay HTML */}
      {selectedIndex !== null && (
        <div className="fixed top-0 text-sm uppercase pointer-events-none left-0 flex flex-col items-start  justify-between z-50 transition-opacity duration-300 w-screen h-screen px-16 py-32 font-karla">
          <div className="text-white  w-full flex justify-between ">
            <h2 className=" font-karantina text-4xl mb-2">Photo</h2>
            <p className="">scroll to close</p>
          </div>
          <div className="w-full  flex justify-between items-center">
            <p>date de la photo</p>
            <p>Noms du client</p>
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-16 cursor-pointer z-50">
        <SwitchButton
          onClick={() => moveBarTo("photo")}
          text="PHOTO"
          isVisible={isPhotoVisible}
          subtext="Switch to photo"
          textposition="text-right"
        />
      </div>
    </div>
  );
}

export default PhotoComponent;
