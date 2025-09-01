"use client";
import { usePathname, useRouter } from "next/navigation";
import { Category, useFilterStore } from "@/store/useFilterStore";
import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NavBarDesktop from "./NavBarDesktop";
import { useIsAnimated } from "@/store/useIsAnimated";

function NavBar() {
  const navItems = [
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const [isFilterClick, setIsFilterClick] = useState<string | null>(null);
  const { setSelectedFilter } = useFilterStore();
  const filterButtons = ["All", "Corporate", "Events", "SocialMedia"];
  const { isNavBarAnimated } = useIsAnimated();
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio"); // ou pathname.startsWith("/studio");
  const { setIsHomeAnimated, setIsAboutAnimated, setIsContactAnimated } =
    useIsAnimated();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedFilter(null);
    }
  }, [pathname, setSelectedFilter]);

  const onFilteredButtonClick = (item: string) => {
    const value = item.toLowerCase() as Category;
    setIsDisabled(true);

    console.log(value);

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
    <>
      {!isStudio && (
        <>
          <MobileNavbar
            filterButtons={filterButtons}
            navItems={navItems}
            pathname={pathname}
            onFilteredButtonClick={onFilteredButtonClick}
            onNavItemClick={onNavItemClick}
          />
          <NavBarDesktop
            onFilteredButtonClick={onFilteredButtonClick}
            onNavItemClick={onNavItemClick}
            isStudio={isStudio}
            isEnter={isNavBarAnimated}
            pathname={pathname}
            filterButtons={filterButtons}
            navItems={navItems}
            isDisabled={isDisabled}
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
