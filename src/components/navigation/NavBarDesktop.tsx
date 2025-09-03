import { useFilterStore } from "@/store/useFilterStore";
import Image from "next/image";
import NavItem from "./NavItem";
import SwitchLangButton from "./SwitchLangButton";

interface IProps {
  isStudio: boolean;
  isEnter: boolean;
  pathname: string;
  filterButtons: string[];
  navItems: { name: string; href: string }[];
  onFilteredButtonClick: (item: string) => void;
  onNavItemClick: (item: { name: string; href: string }) => void;
  isDisabled: boolean;
  elementClicked: string;
}

function NavBarDesktop({
  isStudio,
  isEnter,
  pathname,
  filterButtons,
  navItems,
  onNavItemClick,
  onFilteredButtonClick,
  isDisabled,
  elementClicked,
}: IProps) {
  const { selectedFilter } = useFilterStore();

  return (
    <div
      className={`${isStudio ? "z-0" : "z-50"} ${isEnter ? "translate-y-0" : "-translate-y-[100%]"} transition-all transform ease-in-out duration-[2000ms]  text-white p-8 w-full fixed top-0  items-center justify-between font-karantina hidden lg:flex`}
    >
      <button
        onClick={() => onFilteredButtonClick("All")}
        className="w-3/12 cursor-pointer"
      >
        <Image src="/chromalogo2.png" alt="Logo" width={200} height={100} />
      </button>

      <div
        className="flex items-center justify-between   h-9 space-x-0 relative rounded-sm overflow-hidden text-[20px] font-light"
        style={{
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {filterButtons.map((item) => {
          return (
            <NavItem
              disabled={isDisabled}
              selectedFilter={selectedFilter}
              pathname={pathname}
              key={item}
              name={item.toUpperCase()}
              onClick={() => onFilteredButtonClick(item)}
              elementClicked={elementClicked}
            />
          );
        })}
        {navItems.map((item) => (
          <NavItem
            disabled={isDisabled}
            selectedFilter={selectedFilter}
            pathname={pathname}
            key={item.name}
            name={item.name}
            onClick={() => onNavItemClick(item)}
            elementClicked={elementClicked}
          />
        ))}
      </div>
      <SwitchLangButton />
    </div>
  );
}

export default NavBarDesktop;
