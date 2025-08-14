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
      className={`font-karantina uppercase cursor-pointer text-xl bg-white transition-all duration-500 ease-in-out  ${textposition} text-black  px-4 py-2 border-x border-dashed border-black  hover:border-white`}
      onClick={() => onClick()}
    >
      <ComeUpText height="h-7" text={subtext} />
    </button>
  );
}

export default SwitchButton;
