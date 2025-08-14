import { useFilterStore } from "@/store/useFilterStore";
import ComeUpText from "../ui/animated/ComeUpText";

function NavItem({
  name,
  onClick,
  pathname,
}: {
  name: string;
  onClick: () => void;
  pathname: string;
}) {
  const selectedFilter = useFilterStore((state) => state.selectedFilter);

  return (
    <button
      key={name}
      className={`${selectedFilter === name.toLowerCase() || pathname === `/${name.toLowerCase()}` ? "bg-black text-white border-x border-white" : "text-black bg-white"} border-x border-black w-full h-full border-dashed cursor-pointer hover:bg-black hover:text-white transform transition-all ease-in duration-300`}
      onClick={onClick}
    >
      <ComeUpText height="h-7" text={name} />
    </button>
  );
}

export default NavItem;
