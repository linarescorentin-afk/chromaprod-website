import React, { useMemo } from "react";

function VideoComponent() {
  const videos = useMemo(() => ["video1", "video2", "video3", "video4"], []);
  return (
    <div className="sticky top-0  p-4 w-screen">
      <h1 className="text-4xl font-bold mb-4">🎬 VIDEO</h1>
      <p className="mb-8">Scroll to expand this section</p>
      <div className="w-[98%] text-left">
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
    </div>
  );
}

export default VideoComponent;
