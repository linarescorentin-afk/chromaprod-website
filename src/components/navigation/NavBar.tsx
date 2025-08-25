"use client";
import { usePathname } from "next/navigation";
import { useFilterStore } from "@/store/useFilterStore";
import { useEffect, useState } from "react";

import { useIsEnterState } from "@/store/useIsEnter";
import MobileNavbar from "./MobileNavbar";
import NavBarDesktop from "./NavBarDesktop";

function NavBar() {
  const navItems = [
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const [isFilterClick, setIsFilterClick] = useState<string | null>(null);
  const { setSelectedFilter } = useFilterStore();
  const filterButtons = ["All", "Corporate", "Events", "SocialMedia"];
  const { isEnter } = useIsEnterState();
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio"); // ou pathname.startsWith("/studio");

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedFilter(null);
    }
  }, [pathname, setSelectedFilter]);

  console.log(isFilterClick);

  return (
    <>
      {!isStudio && (
        <>
          <MobileNavbar
            filterButtons={filterButtons}
            navItems={navItems}
            pathname={pathname}
            setIsFilterClick={setIsFilterClick}
          />
          <NavBarDesktop
            isStudio={isStudio}
            isEnter={isEnter}
            pathname={pathname}
            filterButtons={filterButtons}
            navItems={navItems}
            isFilterClick={isFilterClick}
            setIsFilterClick={setIsFilterClick}
          />
          <div className="fixed top-1/2 font-karantina -translate-y-1/2 right-1/2 translate-x-1/2 text-[100px] leading-[80px] lg:text-[200px] z-20 uppercase h-[150px] lg:leading-[150px] overflow-hidden">
            <p className={`${isFilterClick ? "animate-filter" : ""}`}>
              {isFilterClick}
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
