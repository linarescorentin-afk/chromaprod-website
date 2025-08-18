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
        className="w-screen mx-auto "
        // style={{ opacity: widthPercent / 100 }}
      >
        {videos.map((video, index) => (
          <motion.div
            key={index}
            className="px-10 w-full lg:px-32 h-screen flex flex-col py-32 lg:lg:py-32 text-white font-karantina justify-between  mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ amount: 0.3 }} // déclenche quand 30% de l'élément est visible
          >
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-gray-100 font-karla hidden">
                {video.description}
              </p>
            </div>
            <div className="space-y-5 ">
              <p className="text-2xl underline">WATCH THE VIDEO</p>
              <h1 className="text-[150px] font-bold uppercase leading-[120px] w-[200px]">
                {video.title}
              </h1>
            </div>
          </motion.div>
        ))}
      </div>
    </Scroll>
  );
}
