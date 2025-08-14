import React from "react";
import ComeUpText from "./animated/ComeUpText";

function SwitchButton({
  onClick,
  text,
  isVisible,
  subtext,
  textposition,
}: {
  onClick: () => void;
  text: string;
  isVisible: boolean;
  subtext: string;
  textposition: string;
}) {
  return (
    <button
      className={`font-karantina uppercase cursor-pointer text-2xl bg-white transition-all duration-500 ease-in-out  ${textposition} text-black  px-4 py-2 border-x border-dashed border-black hover:bg-black *:hover:text-white hover:border-white`}
      onClick={() => onClick()}
    >
      <ComeUpText height="h-7" text={subtext} />
    </button>
  );
}

export default SwitchButton;
