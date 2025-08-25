import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MobileNavItems from "./MobileNavItems";
import { Category, useFilterStore } from "@/store/useFilterStore";
import { useIsHomeAnimated } from "@/store/isHomeAnimated";
import { useRouter } from "next/navigation";
import { useIsEnterState } from "@/store/useIsEnter";
import MobileHeader from "./MobileHeader";

function MobileNavbar({
  filterButtons,
  setIsFilterClick,
  pathname,
  navItems,
}: {
  filterButtons: string[];
  setIsFilterClick: (value: string | null) => void;
  pathname: string;
  navItems: { name: string; href: string }[];
}) {
  const { isEnter } = useIsEnterState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSelectedFilter } = useFilterStore();
  const { setIsHomeAnimated } = useIsHomeAnimated();
  const router = useRouter();
  return (
    <>
      {" "}
      <div
        className={`w-full z-50 fixed top-0 p-5 flex justify-between lg:hidden text-black font-karantina text-xl ${isEnter ? "translate-y-0" : "-translate-y-[100%]"} transition-all transform ease-in-out duration-[3000ms] `}
      >
        <Link href="/">
          <Image src="/chromalogo2.png" alt="Logo" width={170} height={100} />
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className=" bg-white px-5 py-[0.2rem] font-bold border-x border-black border-dashed text-2xl tracking-wider"
        >
          <p>MENU</p>
        </button>
      </div>
      <div
        className={`w-full h-full fixed top-0 left-0 flex lg:hidden z-50 flex-col font-karantina text-5xl transform duration-1000 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <MobileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {filterButtons.map((item, index) => {
          const value = item.toLowerCase() as Category;
          return (
            <MobileNavItems
              delay={index * 0.1}
              isMenuOpen={isMenuOpen}
              pathname={pathname}
              key={item}
              name={item.toUpperCase()}
              onClick={() => {
                if (pathname === "/") {
                  setIsMenuOpen(false);
                  setSelectedFilter(value);
                  setIsFilterClick(value);
                  setIsHomeAnimated(false);
                  setTimeout(() => {
                    setIsHomeAnimated(true);
                    setIsFilterClick(null);
                  }, 3500);
                } else {
                  setIsMenuOpen(false);
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
          <MobileNavItems
            delay={0.4}
            isMenuOpen={isMenuOpen}
            pathname={pathname}
            key={item.name}
            name={item.name}
            onClick={() => {
              setIsMenuOpen(false);
              router.push(item.href);
            }}
          />
        ))}

        <MobileNavItems
          delay={0.6}
          isMenuOpen={isMenuOpen}
          pathname={pathname}
          name={"CONTACT"}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        />
      </div>
    </>
  );
}

export default MobileNavbar;
