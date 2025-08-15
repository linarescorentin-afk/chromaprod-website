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
  return (
    <button
      className={`font-karantina fixed bottom-12 ${subtext === "Switch to video" ? "lg:left-15 left-5" : "lg:right-15 right-5"} z-30 uppercase cursor-pointer text-xl transition-all duration-500 ease-in-out hover:scale-110  ${textposition}  lg:text-red-500 lg:bg-transparent lg:p-0 underline bg-white px-5 py-2 text-black`}
      onClick={() => onClick()}
    >
      <ComeUpText height="lg:h-6 h-7" text={subtext} />
    </button>
  );
}

export default SwitchButton;
