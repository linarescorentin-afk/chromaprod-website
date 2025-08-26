import { Category, useFilterStore } from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { useRouter } from "next/navigation";
import { useIsAnimated } from "@/store/isHomeAnimated";
import SwitchLangButton from "./SwitchLangButton";

interface IProps {
  isStudio: boolean;
  isEnter: boolean;
  pathname: string;
  filterButtons: string[];
  navItems: { name: string; href: string }[];
  setIsFilterClick: React.Dispatch<React.SetStateAction<string | null>>;
}

function NavBarDesktop({
  isStudio,
  isEnter,
  pathname,
  filterButtons,
  navItems,
  setIsFilterClick,
}: IProps) {
  const router = useRouter();
  const { setIsHomeAnimated, setIsAboutAnimated, setIsContactAnimated } =
    useIsAnimated();
  const { selectedFilter, setSelectedFilter } = useFilterStore();
  const [isDisabled, setIsDisabled] = useState(false);

  const onFilteredButtonClick = (item: string) => {
    const value = item.toLowerCase() as Category;
    setIsDisabled(true);

    switch (pathname) {
      case "/about":
        setIsAboutAnimated(false);
        setTimeout(() => {
          setIsFilterClick(value);
          setSelectedFilter(value);
          setIsHomeAnimated(false);
          router.push("/");
        }, 2000);

        setTimeout(() => {
          setIsHomeAnimated(true);
          setIsFilterClick(null);
          setIsDisabled(false);
        }, 4500);
        break;

      case "/contact":
        setIsContactAnimated(false);
        setTimeout(() => {
          setIsFilterClick(value);
          setSelectedFilter(value);
          setIsHomeAnimated(false);
          router.push("/");
        }, 2000);

        setTimeout(() => {
          setIsHomeAnimated(true);
          setIsFilterClick(null);
          setIsDisabled(false);
        }, 4500);
        break;

      case "/":
        setIsHomeAnimated(false);
        setIsFilterClick(value);
        setTimeout(() => {
          setSelectedFilter(value);
          setIsHomeAnimated(true);
          setIsFilterClick(null);
          setIsDisabled(false);
        }, 2500);

        break;

      default:
        router.push("/");
        setIsHomeAnimated(false);
        setIsFilterClick(value);
        setSelectedFilter(value);
        setTimeout(() => {
          setIsHomeAnimated(true);
          setIsDisabled(false);
        }, 3500);
    }
  };

  const onNavItemClick = (item: { name: string; href: string }) => {
    setIsDisabled(true);
    setSelectedFilter(null);
    setIsFilterClick(null);

    switch (pathname) {
      case "/":
        setIsHomeAnimated(false);
        setTimeout(() => {
          router.push(item.href);
          setIsDisabled(false);
        }, 2000);
        break;

      case "/about":
        setIsAboutAnimated(false);
        setTimeout(() => {
          router.push(item.href);
          setIsDisabled(false);
        }, 2000);
        break;

      case "/contact":
        setIsContactAnimated(false);
        setTimeout(() => {
          router.push(item.href);
          setIsDisabled(false);
        }, 2000);
        break;

      default:
        router.push(item.href);
        setIsDisabled(false);
    }
  };

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
          return (
            <NavItem
              disabled={isDisabled}
              selectedFilter={selectedFilter}
              pathname={pathname}
              key={item}
              name={item.toUpperCase()}
              onClick={() => onFilteredButtonClick(item)}
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
          />
        ))}
      </div>
      <SwitchLangButton />
    </div>
  );
}

export default NavBarDesktop;
