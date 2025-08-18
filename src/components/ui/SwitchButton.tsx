import Image from "next/image";
import ComeUpText from "./animated/ComeUpText";

function SwitchButton({
  onClick,
  subtext,
  textposition,
  selectedFilter,
}: {
  onClick: () => void;
  subtext: string;
  textposition: string;
  selectedFilter: string | null;
}) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`flex items-end ${subtext !== "Switch to video" ? "flex-row-reverse" : ""} uppercase`}
    >
      <ComeUpText height="lg:h-6 h-7" text={subtext} />
      <Image
        className={`mx-2 ${subtext === "Switch to video" ? "rotate-180" : ""} group-hover:-translate-y-[2px] transition-all duration-700 ease-in-out`}
        src={"/arrowChr.svg"}
        alt="Arrow"
        height={10}
        width={10}
      />
    </button>
  );
}

export default SwitchButton;
