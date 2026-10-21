"use client";
import { usePathname, useRouter } from "next/navigation";
import { Category, useFilterStore } from "@/store/useFilterStore";
import { useEffect, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import NavBarDesktop from "./NavBarDesktop";
import { useIsAnimated } from "@/store/useIsAnimated";
import { getCategories, ICategoryItem } from "@/sanity/lib/getCategories";

const DEFAULT_FILTER_BUTTONS: ICategoryItem[] = [
  { value: "all", nameEn: "All", nameFr: "Tout" },
  { value: "resort", nameEn: "Resort", nameFr: "Resort" },
  { value: "corporate", nameEn: "Corporate", nameFr: "Corporate" },
  { value: "events", nameEn: "Events", nameFr: "Événements" },
  { value: "socialmedia", nameEn: "SocialMedia", nameFr: "RéseauxSociaux" },
];

function NavBar() {
  const navItems = [
    { nameEn: "ABOUT", nameFr: "À PROPOS", href: "/about" },
    { nameEn: "CONTACT", nameFr: "CONTACT", href: "/contact" },
  ];

  const [isFilterClick, setIsFilterClick] = useState<string | null>(null);
  const { setSelectedFilter } = useFilterStore();
  const [filterButtons, setFilterButtons] = useState<ICategoryItem[]>(
    DEFAULT_FILTER_BUTTONS,
  );
  const { isNavBarAnimated } = useIsAnimated();
  const pathname = usePathname();
  const isStudio = pathname.includes("/studio");
  const { setIsHomeAnimated, setIsAboutAnimated, setIsContactAnimated } =
    useIsAnimated();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const [elementClicked, setElementClicked] = useState<string>("all");

  useEffect(() => {
    getCategories()
      .then((cats) => {
        if (cats && cats.length > 0) {
          setFilterButtons(cats);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories from Sanity:", err);
      });
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedFilter(null);
      if (pathname === "/about") setElementClicked("ABOUT");
      if (pathname === "/contact") setElementClicked("CONTACT");
    }
  }, [pathname, setSelectedFilter]);

  const onFilteredButtonClick = ({
    itemName,
    itemValue,
  }: {
    itemName: string;
    itemValue: string;
  }) => {
    const value = itemValue.toLowerCase() as Category;
    setElementClicked(value);
    window.scrollTo(0, 0);
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
