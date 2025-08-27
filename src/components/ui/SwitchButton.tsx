import Image from "next/image";
import ComeUpText from "./animated/ComeUpText";

function SwitchButton({
  onClick,
  subtext,
}: {
  onClick: () => void;
  subtext: string;
}) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`font-karantina flex items-end ${subtext !== "Switch to video" ? "flex-row-reverse" : ""} text-red-500 uppercase cursor-pointer underline`}
    >
      <ComeUpText height="h-6" text={subtext} />
      <Image
        className={`mx-2 ${subtext === "Switch to video" ? "rotate-180" : ""}  group-hover:-translate-y-[2px] transition-all duration-700 ease-in-out`}
        src={"/arrowChr.svg"}
        alt="Arrow"
        height={10}
        width={10}
      />
    </button>
  );
}

export default SwitchButton;
