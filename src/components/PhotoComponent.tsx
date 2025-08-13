import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import PhotoScene from "./photo/PhotoScene";
import SwitchButton from "./ui/SwitchButton";
import { getPhotos } from "@/sanity/lib/getPhotos";
import { useFilterStore } from "@/store/useFilterStore";

export interface IPhoto {
  image: string;
  date: string | null;
  client: string | null;
  name: string | null;
  formats: "horizontal" | "vertical";
  categories: string[];
}

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
  const category = useFilterStore((state) => state.selectedFilter);
  const [photosFetched, setPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getPhotos();
      setPhotos(data);
    }
    load();
  }, []);

  const photos = React.useMemo(() => {
    if (category === "all") return photosFetched;

    console.log(photosFetched);

    const photos = photosFetched.filter((p) =>
      p.categories.some((c) => c === category),
    );

    return photos;
    // return photosFetched.filter((p) =>
    //   (p.categories || []).some((c) => c.toUpperCase() === category),
    // );
  }, [photosFetched, category]);

  if (!photos.length) {
    return <div className="text-white p-4">Chargement des photos...</div>;
  }

  console.log(category);

  return (
    <div className="h-screen w-screen">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        frameloop={isPhotoVisible ? "always" : "demand"}
      >
        <color attach="background" args={["#111"]} />
        <ScrollControls pages={photos.length + 0.85} damping={0.5}>
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
        <div className="fixed top-0 text-sm uppercase pointer-events-none left-0 flex flex-col items-start  justify-between z-50 transition-opacity duration-300 w-screen h-screen px-16 py-24 font-karla">
          <div
            className={`text-white   w-full flex ${photosFetched[selectedIndex].name ? "justify-between" : "justify-end"}`}
          >
            {photosFetched[selectedIndex].name && (
              <h2 className=" font-karantina text-4xl mb-2">
                {photosFetched[selectedIndex].name}
              </h2>
            )}
            <p className="text-sm">Scroll or click to close</p>
          </div>
          <div className="w-full  flex justify-between items-center">
            {photosFetched[selectedIndex].date && (
              <p>{photosFetched[selectedIndex].date}</p>
            )}
            {photosFetched[selectedIndex].client && (
              <p>{photosFetched[selectedIndex].client}</p>
            )}
          </div>
        </div>
      )}
      <div className="fixed bottom-4 right-16 cursor-pointer z-10">
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
