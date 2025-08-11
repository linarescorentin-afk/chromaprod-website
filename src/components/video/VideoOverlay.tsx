"use client";
import { Scroll } from "@react-three/drei";
import { IVideo } from "../VideoComponent";
import { motion } from "framer-motion";

export default function Overlay({
  videos,
  widthPercent,
}: {
  videos: IVideo[];
  widthPercent: number;
}) {
  return (
    <Scroll html>
      <div
        className="max-w-2xl mx-auto"
        style={{ opacity: widthPercent / 100 }}
      >
        {videos.map((video, index) => (
          <motion.div
            key={index}
            className="w-screen px-10 lg:px-32 h-screen flex flex-col py-20 lg:py-32 text-white font-karantina"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 0.3 }} // déclenche quand 30% de l'élément est visible
          >
            <div>
              <h1 className="text-5xl font-bold mb-2 uppercase">
                {video.title}
              </h1>
              <p className="text-lg text-gray-300 font-karla">
                {video.description}
              </p>
            </div>
            <div className="flex items-end justify-end h-full">
              <button className="cursor-pointer underline">See project</button>
            </div>
          </motion.div>
        ))}
      </div>
    </Scroll>
  );
}
