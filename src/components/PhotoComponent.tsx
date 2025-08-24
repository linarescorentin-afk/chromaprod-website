import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import PhotoScene from "./photo/PhotoScene";

import { getPhotos } from "@/sanity/lib/getPhotos";
import { useFilterStore } from "@/store/useFilterStore";
import { useIsLoading } from "@/store/useIsLoading";
import { R3FLoadingBridge } from "./loader/R3FLoadingBridge";

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
  widthPercent,
}: {
  isPhotoVisible: boolean;
  widthPercent: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const category = useFilterStore((state) => state.selectedFilter);
  const [photosFetched, setPhotos] = useState<IPhoto[]>([]);
  const { setIsPhotoLoading, setIsPhotoCanvasLoading } = useIsLoading();

  useEffect(() => {
    async function load() {
      const data = await getPhotos();
      setPhotos(data);
      setIsPhotoLoading(false);
    }
    load();
  }, [setIsPhotoLoading]);

  const photos = React.useMemo(() => {
    if (category === "all") return photosFetched;

    const photos = photosFetched.filter((p) =>
      p.categories.some((c) => c === category),
    );

    return photos;
  }, [photosFetched, category]);

  if (!photos.length) {
    return <div className="text-white p-4">Chargement des photos...</div>;
  }

  return (
    <div className={`h-screen w-screen`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        frameloop={isPhotoVisible ? "always" : "demand"}
        className={`canvas ${isPhotoVisible ? "visible" : "hidden"}`}
      >
        <Suspense fallback={null}>
          <ScrollControls
            pages={photos.length + photos.length * 0.1}
            damping={0.5}
          >
            <PhotoScene
              photos={photos}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              widthPercent={widthPercent}
            />
          </ScrollControls>
        </Suspense>

        <R3FLoadingBridge onDone={() => setIsPhotoCanvasLoading(false)} />
      </Canvas>

      {/* ✅ Overlay HTML */}
      {selectedIndex !== null && (
        <div className="fixed top-0 text-sm uppercase pointer-events-none left-0 flex flex-col items-start  justify-between z-50 transition-opacity duration-300 w-full h-full px-16 py-24 font-karla">
          <div
            className={`text-white w-full flex ${photosFetched[selectedIndex].name ? "justify-between" : "justify-end"}`}
          >
            {photosFetched[selectedIndex].name && (
              <h2 className=" font-karantina text-4xl mb-2">
                {photosFetched[selectedIndex].name}
              </h2>
            )}
            <p className="text-sm font-karla">Scroll or click to close</p>
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
    </div>
  );
}

export default PhotoComponent;
