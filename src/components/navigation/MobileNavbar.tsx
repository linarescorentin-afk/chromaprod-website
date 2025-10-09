import Image from "next/image";
import React, { useState } from "react";
import MobileNavItems from "./MobileNavItems";
import { useIsEnterState } from "@/store/useIsEnter";
import MobileHeader from "./MobileHeader";
import { useIsAnimated } from "@/store/useIsAnimated";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";

function MobileNavbar({
  filterButtons,
  pathname,
  navItems,
  onFilteredButtonClick,
  onNavItemClick,
}: {
  filterButtons: { nameEn: string; nameFr: string }[];
  pathname: string;
  navItems: { nameEn: string; nameFr: string; href: string }[];
  onFilteredButtonClick: ({
    itemName,
    itemValue,
  }: {
    itemName: string;
    itemValue: string;
  }) => void;
  onNavItemClick: (item: {
    nameEn: string;
    nameFr: string;
    href: string;
  }) => void;
}) {
  const { isEnter } = useIsEnterState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isNavBarAnimated } = useIsAnimated();
  const { selectedLanguage } = useIsSelectedLanguage();

  return (
    <>
      <div
        className={`w-full z-50 fixed top-0 p-5 flex justify-between lg:hidden text-black font-karantina text-xl ${isEnter ? "translate-y-0" : "-translate-y-[100%]"} transition-all transform ease-in-out duration-[3000ms] ${isNavBarAnimated ? "translate-y-0" : "-translate-y-[100%]"}`}
      >
        <button
          onClick={() =>
            onFilteredButtonClick({
              itemName: selectedLanguage === "en" ? "All" : "Tout",
              itemValue: "All",
            })
          }
          className="w-6/12 cursor-pointer"
        >
          <Image src="/chromalogo2.png" alt="Logo" width={170} height={100} />
        </button>

        <button
          onClick={() => setIsMenuOpen(true)}
          className=" bg-white px-5 py-[0.2rem] border-x border-black border-dashed text-2xl"
        >
          <p>MENU</p>
        </button>
      </div>
      <div
        className={`w-full h-full fixed top-0 left-0 flex lg:hidden z-50 flex-col font-karantina text-5xl transform duration-1000 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {filterButtons.map((item, index) => {
          return (
            <MobileNavItems
              delay={index * 0.1}
              isMenuOpen={isMenuOpen}
              pathname={pathname}
              key={item.nameEn}
              name={
                selectedLanguage === "en"
                  ? item.nameEn.toUpperCase()
                  : item.nameFr.toUpperCase()
              }
              onClick={() => {
                setIsMenuOpen(false);
                onFilteredButtonClick({
                  itemName:
                    selectedLanguage === "en" ? item.nameEn : item.nameFr,
                  itemValue: item.nameEn,
                });
              }}
            />
          );
        })}
        {navItems.map((item) => (
          <MobileNavItems
            delay={0.4}
            isMenuOpen={isMenuOpen}
            pathname={pathname}
            key={selectedLanguage === "en" ? item.nameEn : item.nameFr}
            name={selectedLanguage === "en" ? item.nameEn : item.nameFr}
            onClick={() => {
              setIsMenuOpen(false);
              onNavItemClick(item);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default MobileNavbar;
