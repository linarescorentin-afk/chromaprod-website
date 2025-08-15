import React from "react";
import ComeUpText from "./animated/ComeUpText";

function SwitchButton({
  onClick,
  subtext,
  textposition,
}: {
  onClick: () => void;
  subtext: string;
  textposition: string;
}) {
  console.log(subtext);
  return (
    <button
      className={`font-karantina fixed bottom-10 ${subtext === "Switch to video" ? "lg:left-12 left-5" : "lg:right-12 right-5"} z-30 uppercase cursor-pointer text-xl transition-all duration-500 ease-in-out hover:scale-110  ${textposition}  text-red-500 underline`}
      onClick={() => onClick()}
    >
      <ComeUpText height="h-6" text={subtext} />
    </button>
  );
}

export default SwitchButton;
