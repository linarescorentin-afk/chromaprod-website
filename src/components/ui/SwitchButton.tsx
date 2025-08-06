import React from "react";

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
      className={`font-karantina uppercase cursor-pointer text-[3rem]  opacity-20 hover:opacity-100 hover:scale-100 scale-95 transition-all duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-50"} ${textposition} `}
      onClick={() => onClick()}
    >
      <p className="leading-none">{text}</p>
      <p className="text-sm font-karla">{subtext}</p>
    </button>
  );
}

export default SwitchButton;
