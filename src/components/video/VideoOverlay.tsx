"use client";
import { Scroll } from "@react-three/drei";

export default function VideoOverlay() {
  return (
    <Scroll html>
      <div className="max-w-2xl mx-auto">
        <div className="w-screen px-10 lg:px-44 h-screen flex flex-col py-10 lg:py-32 text-white font-oswald">
          <h1 className="text-5xl font-bold mb-2">FIRST VIDEO</h1>
          <p className="text-lg text-gray-300">This is the first subtitle</p>
          <button className="bg-white text-black max-w-[200px] py-2 mt-5">
            See project
          </button>
        </div>

        <div className="w-screen px-10 lg:px-44 h-screen flex flex-col py-10 lg:py-32 text-white font-oswald">
          <h1 className="text-5xl font-bold mb-2">SECOND VIDEO</h1>
          <p className="text-lg text-gray-300">This is the second subtitle</p>
          <button className="bg-white text-black max-w-[200px] py-2 mt-5">
            See project
          </button>
        </div>

        <div className="w-screen px-10 lg:px-44 h-screen flex flex-col py-10 lg:py-32 text-white font-oswald ">
          <h1 className="text-5xl font-bold mb-2">THIRD VIDEO</h1>
          <p className="text-lg text-gray-300">This is the third subtitle</p>
          <button className="bg-white text-black max-w-[200px] py-2 mt-5">
            See project
          </button>
        </div>

        <div className="w-screen px-10 lg:px-44 h-screen flex flex-col py-10 lg:py-32 text-white font-oswald">
          <h1 className="text-5xl font-bold mb-2">FOURTH VIDEO</h1>
          <p className="text-lg text-gray-300">This is the fourth subtitle</p>
          <button className="bg-white text-black max-w-[200px] py-2 mt-5">
            See project
          </button>
        </div>
      </div>
    </Scroll>
  );
}
