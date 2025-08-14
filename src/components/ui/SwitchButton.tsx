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
      className={`font-karantina uppercase cursor-pointer text-xl transition-all duration-500 ease-in-out hover:scale-110  ${textposition}  text-red-500 underline`}
      onClick={() => onClick()}
    >
      <ComeUpText height="h-6" text={subtext} />
    </button>
  );
}

export default SwitchButton;
