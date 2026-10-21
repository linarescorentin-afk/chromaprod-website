import { useFilterStore } from "@/store/useFilterStore";
import Image from "next/image";
import NavItem from "./NavItem";
import SwitchLangButton from "./SwitchLangButton";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";

interface IProps {
  isStudio: boolean;
  isEnter: boolean;
  pathname: string;
  filterButtons: { value?: string; nameEn: string; nameFr: string }[];
  navItems: { nameEn: string; nameFr: string; href: string }[];
  onFilteredButtonClick: (item: {
    itemName: string;
    itemValue: string;
  }) => void;
  onNavItemClick: (item: {
    nameEn: string;
    nameFr: string;
    href: string;
  }) => void;
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
  const { selectedLanguage } = useIsSelectedLanguage();

  return (
    <div
      className={`${isStudio ? "z-0" : "z-50"} ${isEnter ? "translate-y-0" : "-translate-y-[100%]"} transition-all transform ease-in-out duration-[2000ms]  text-white p-8 w-full fixed top-0  items-center justify-between font-karantina hidden lg:flex `}
    >
      <button
        onClick={() =>
          onFilteredButtonClick({
            itemName: selectedLanguage === "en" ? "All" : "Tout",
            itemValue: "all",
          })
        }
        className="w-2/12 cursor-pointer"
      >
        <Image src="/logoCLVMgauche.webp" alt="Logo" width={200} height={100} />
      </button>

      <div
        className="flex items-center justify-between h-9 space-x-0 relative rounded-sm overflow-hidden text-[20px] font-light w-auto min-w-[650px] max-w-5xl"
        style={{
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {filterButtons.map((item) => {
          const itemKey = item.value || item.nameEn;
          return (
            <NavItem
              disabled={isDisabled}
              selectedFilter={selectedFilter}
              pathname={pathname}
              key={itemKey}
              itemKey={itemKey}
              name={
                selectedLanguage === "en"
                  ? item.nameEn.toUpperCase()
                  : item.nameFr.toUpperCase()
              }
              onClick={() =>
                onFilteredButtonClick({
                  itemName:
                    selectedLanguage === "en" ? item.nameEn : item.nameFr,
                  itemValue: itemKey,
                })
              }
              elementClicked={elementClicked}
            />
          );
        })}
        {navItems.map((item) => (
          <NavItem
            disabled={isDisabled}
            selectedFilter={selectedFilter}
            pathname={pathname}
            key={selectedLanguage === "en" ? item.nameEn : item.nameFr}
            itemKey={item.nameEn}
            name={selectedLanguage === "en" ? item.nameEn : item.nameFr}
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
