import { m } from "framer-motion";
import React, { useMemo } from "react";

function PhotoComponent({
  isPhotoVisible,
  moveBarTo,
}: {
  isPhotoVisible: boolean;
  moveBarTo: (target: "video" | "photo") => void;
}) {
  const photos = useMemo(
    () => ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6"],
    [],
  );
  return (
    <div className="p-10 text-right z-0 bg-black">
      <h1 className="text-4xl font-bold mb-4">📷 PHOTO</h1>
      <p className="mb-8">Scroll to expand this section</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full text-left">
        {photos.map((photo, index) => (
          <div key={index} className="mb-4 bg-blue-500 h-[500px] p-4">
            <h2 className="text-2xl font-semibold mb-2">{photo}</h2>
            <p className="text-gray-300">
              This is a placeholder for {photo}. Replace with actual photo
              content.
            </p>
          </div>
        ))}
      </div>
      {isPhotoVisible && (
        <button
          onClick={() => {
            moveBarTo("video");
          }}
          className="bg-white text-black px-10 py-5 fixed bottom-4 left-10 pointer-cursor "
        >
          See Videos
        </button>
      )}
    </div>
  );
}

export default PhotoComponent;
