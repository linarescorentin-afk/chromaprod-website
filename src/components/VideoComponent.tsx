import React, { useMemo } from "react";

function VideoComponent({
  isVideoVisible,
  moveBarTo,
}: {
  isVideoVisible: boolean;
  moveBarTo: (target: "video" | "photo") => void;
}) {
  const videos = useMemo(() => ["video1", "video2", "video3", "video4"], []);
  return (
    <div className="p-10 w-screen relative">
      <h1 className="text-4xl font-bold mb-4">🎬 VIDEO</h1>
      <p className="mb-8">Scroll to expand this section</p>
      <div className=" text-left">
        {videos.map((video, index) => (
          <div key={index} className="mb-4 bg-red-300 h-[500px] p-4">
            <h2 className="text-2xl font-semibold mb-2">{video}</h2>
            <p className="text-gray-300">
              This is a placeholder for {video}. Replace with actual video
              content.
            </p>
          </div>
        ))}
      </div>
      {isVideoVisible && (
        <button
          onClick={() => {
            // Logique pour revenir à la section photo
            moveBarTo("photo");
          }}
          className="bg-white text-black px-10 py-5 fixed bottom-4 right-10 pointer-cursor "
        >
          See Photo
        </button>
      )}
    </div>
  );
}

export default VideoComponent;
