"use client";
import { usePathname, useRouter } from "next/navigation";
import { Category, useFilterStore } from "@/store/useFilterStore";
import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NavBarDesktop from "./NavBarDesktop";
import { useIsAnimated } from "@/store/useIsAnimated";
import { useIsSelectedLanguage } from "@/store/useSelectedLanguage";

function NavBar() {
  const navItems = [
    { nameEn: "ABOUT", nameFr: "À PROPOS", href: "/about" },
    { nameEn: "CONTACT", nameFr: "CONTACT", href: "/contact" },
  ];

  const [isFilterClick, setIsFilterClick] = useState<string | null>(null);
  const { setSelectedFilter } = useFilterStore();
  const filterButtons = [
    { nameEn: "All", nameFr: "Tout" },
    { nameEn: "Corporate", nameFr: "Corporate" },
    { nameEn: "Events", nameFr: "Événements" },
    { nameEn: "SocialMedia", nameFr: "RéseauxSociaux" },
  ];
  const { isNavBarAnimated } = useIsAnimated();
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio"); // ou pathname.startsWith("/studio");
  const { setIsHomeAnimated, setIsAboutAnimated, setIsContactAnimated } =
    useIsAnimated();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const { selectedLanguage } = useIsSelectedLanguage();
  const [elementClicked, setElementClicked] = useState<string>(
    selectedLanguage === "en" ? "All" : "Tout",
  );

  useEffect(() => {
    setElementClicked(selectedLanguage === "en" ? "All" : "Tout");
  }, [selectedLanguage]);

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedFilter(null);
    }
  }, [pathname, setSelectedFilter]);

  const onFilteredButtonClick = ({
    itemName,
    itemValue,
  }: {
    itemName: string;
    itemValue: string;
  }) => {
    setElementClicked(itemName);
    window.scrollTo(0, 0);
    const value = itemValue.toLowerCase() as Category;
    setIsDisabled(true);

    switch (pathname) {
      case "/about":
        setIsAboutAnimated(false);
        setTimeout(() => {
          setIsFilterClick(itemName);
          setSelectedFilter(value);
          setIsHomeAnimated(false);
          router.push("/");
        }, 2000);

        setTimeout(() => {
          setIsHomeAnimated(true);
          setIsFilterClick(null);
          setIsDisabled(false);
        }, 3700);
        break;

      case "/contact":
        setIsContactAnimated(false);
        setTimeout(() => {
          setIsFilterClick(itemName);
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
        setIsFilterClick(itemName);
        setTimeout(() => {
          setSelectedFilter(value);
          setIsHomeAnimated(true);
          setIsFilterClick(null);
          setIsDisabled(false);
        }, 1800);

        break;

      default:
        router.push("/");
        setIsHomeAnimated(false);
        setIsFilterClick(itemName);
        setSelectedFilter(value);
        setTimeout(() => {
          setIsHomeAnimated(true);
          setIsDisabled(false);
        }, 2300);
    }
  };

  const onNavItemClick = (item: {
    nameEn: string;
    nameFr: string;
    href: string;
  }) => {
    setElementClicked(item.nameEn);
    window.scrollTo(0, 0);
    setIsDisabled(true);
    setSelectedFilter(null);
    setIsFilterClick(null);

    switch (pathname) {
      case "/":
        setIsHomeAnimated(false);
        setTimeout(() => {
          router.push(item.href);
          setIsDisabled(false);
        }, 1700);
        break;

      case "/about":
        setIsAboutAnimated(false);
        setTimeout(() => {
          router.push(item.href);
          setIsDisabled(false);
        }, 1700);
        break;

      case "/contact":
        setIsContactAnimated(false);
        setTimeout(() => {
          router.push(item.href);
          setIsDisabled(false);
        }, 1700);
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
            elementClicked={elementClicked}
          />
          <div className="fixed top-1/2 font-karantina -translate-y-1/2 right-1/2 translate-x-1/2 text-[100px] leading-[80px] lg:text-[200px] z-20 uppercase h-[150px] lg:leading-[150px] overflow-hidden text-white">
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
