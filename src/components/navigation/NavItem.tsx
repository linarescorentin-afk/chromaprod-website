import ComeUpText from "../ui/animated/ComeUpText";

function NavItem({
  name,
  onClick,
  disabled = false,
  elementClicked,
}: {
  name: string;
  disabled: boolean;
  onClick: () => void;
  pathname: string;
  selectedFilter: string | null;
  elementClicked: string;
}) {
  console.log(
    "elementClicked dans NavItem:",
    elementClicked,
    name.toLocaleLowerCase(),
  );
  return (
    <button
      disabled={disabled}
      key={name}
      className={`${elementClicked.toLocaleLowerCase() === name.toLocaleLowerCase() ? "bg-black text-white border-y lg:border-x lg:border-white border-black" : "text-black bg-white"} border-y lg:border-x lg:border-y-0 border-black w-full h-full border-dashed cursor-pointer  transform transition-all ease-in duration-300 px-5 hover:bg-black hover:text-white hover:border-white`}
      onClick={onClick}
    >
      <ComeUpText height="h-7" text={name} className="lg:flex hidden" />
    </button>
  );
}

export default NavItem;
