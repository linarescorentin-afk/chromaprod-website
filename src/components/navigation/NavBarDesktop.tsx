import { Category, useFilterStore } from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItem from "./NavItem";
import { useRouter } from "next/navigation";
import { useIsHomeAnimated } from "@/store/isHomeAnimated";
import SwitchLangButton from "./SwitchLangButton";

interface IProps {
  isStudio: boolean;
  isEnter: boolean;
  pathname: string;
  filterButtons: string[];
  navItems: { name: string; href: string }[];
  isFilterClick: string | null;
  setIsFilterClick: React.Dispatch<React.SetStateAction<string | null>>;
}

function NavBarDesktop({
  isStudio,
  isEnter,
  pathname,
  filterButtons,
  navItems,
  isFilterClick,
  setIsFilterClick,
}: IProps) {
  const router = useRouter();
  const { setIsHomeAnimated } = useIsHomeAnimated();
  const { setSelectedFilter } = useFilterStore();
  return (
    <div
      className={`${isStudio ? "z-0" : "z-50"} ${isEnter ? "translate-y-0" : "-translate-y-[100%]"} transition-all transform ease-in-out duration-[2000ms]  text-white p-8 w-full fixed top-0  items-center justify-between font-karantina hidden lg:flex`}
    >
      <Link href="/" className="w-3/12">
        <Image src="/chromalogo2.png" alt="Logo" width={200} height={100} />
      </Link>

      <div
        className="flex items-center justify-between   h-9 space-x-0 relative rounded-sm overflow-hidden text-[20px] font-light"
        style={{
          boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        {filterButtons.map((item) => {
          const value = item.toLowerCase() as Category;
          return (
            <NavItem
              selectedFilter={isFilterClick}
              pathname={pathname}
              key={item}
              name={item.toUpperCase()}
              onClick={() => {
                if (pathname === "/") {
                  setIsHomeAnimated(false);
                  setIsFilterClick(value);
                  setTimeout(() => {
                    setIsHomeAnimated(true);
                    setSelectedFilter(value);
                    setIsFilterClick(null);
                  }, 3500);
                } else {
                  router.push("/");
                  setSelectedFilter(value);
                  setIsFilterClick(value);
                  setTimeout(() => {
                    setIsFilterClick(null);
                  }, 3500);
                }
              }}
            />
          );
        })}
        {navItems.map((item) => (
          <NavItem
            selectedFilter={isFilterClick}
            pathname={pathname}
            key={item.name}
            name={item.name}
            onClick={() => {
              router.push(item.href);
            }}
          />
        ))}
      </div>
      <SwitchLangButton />
    </div>
  );
}

export default NavBarDesktop;
