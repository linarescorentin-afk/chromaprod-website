import React, { useMemo } from "react";

function PhotoComponent() {
  const photos = useMemo(() => ["photo1", "photo2", "photo3", "photo4"], []);
  return (
    <div className="sticky top-0 p-4  text-right ">
      <h1 className="text-4xl font-bold mb-4">📷 PHOTO</h1>
      <p className="mb-8">Scroll to expand this section</p>

      {photos.map((photo, index) => (
        <div key={index} className="mb-4 bg-red-800 h-[500px] p-4">
          <h2 className="text-2xl font-semibold mb-2">{photo}</h2>
          <p className="text-gray-300">
            This is a placeholder for {photo}. Replace with actual photo
            content.
          </p>
        </div>
      ))}
    </div>
  );
}

export default PhotoComponent;
