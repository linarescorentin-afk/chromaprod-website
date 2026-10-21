import ComeUpText from "../ui/animated/ComeUpText";

function NavItem({
  name,
  itemKey,
  onClick,
  disabled = false,
  elementClicked,
}: {
  name: string;
  itemKey?: string;
  disabled: boolean;
  onClick: () => void;
  pathname: string;
  selectedFilter: string | null;
  elementClicked: string;
}) {
  const keyToCompare = itemKey || name;
  const isActive =
    elementClicked.toLocaleLowerCase() === keyToCompare.toLocaleLowerCase();

  return (
    <button
      disabled={disabled}
      key={name}
      className={`${isActive ? "bg-black text-white border-y lg:border-x lg:border-white border-black" : "text-black bg-white"} border-y lg:border-x lg:border-y-0 border-black w-full h-full border-dashed cursor-pointer whitespace-nowrap transform transition-all ease-in duration-300 px-4 hover:bg-black hover:text-white hover:border-white`}
      onClick={onClick}
    >
      <ComeUpText height="h-7" text={name} className="lg:flex hidden" />
    </button>
  );
}

export default NavItem;
