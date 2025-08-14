"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NavItem from "./NavItem";
import { Category, useFilterStore } from "@/store/useFilterStore";
import path from "path";
import { useEffect, useState } from "react";
import Link from "next/link";
import MobileNavItems from "./MobileNavItems";

function NavBar() {
  const navItems = [{ name: "ABOUT", href: "/about" }];

  console.log(path);

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setSelectedFilter = useFilterStore((state) => state.setSelectedFilter);
  const filterButtons = ["All", "Corporate", "Events", "SocialMedia"];

  const pathname = usePathname();

  const isStudio = pathname.includes("/studio"); // ou pathname.startsWith("/studio");

  useEffect(() => {
    if (pathname !== "/") {
      setSelectedFilter(null);
    }
  }, [pathname, setSelectedFilter]);

  return (
    <>
      {!isStudio && (
        <>
          <div
            className={`w-full z-50 fixed top-0 p-5 flex justify-end lg:hidden text-black font-karantina text-xl `}
          >
            <button
              onClick={() => setIsMenuOpen(true)}
              className=" bg-white px-5 py-[0.2rem] border-x border-black border-dashed text-2xl"
            >
              <p>MENU</p>
            </button>
          </div>
          <div
            className={`w-screen h-screen fixed top-0 left-0 flex lg:hidden z-50 flex-col font-karantina text-5xl transform duration-1000 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <button
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className=" absolute top-5 right-5 w-fit h-12 flex items-center justify-center font-karla text-[3rem] z-50 mix-blend-difference"
            >
              x
            </button>
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
                    } else {
                      setIsMenuOpen(false);
                      router.push("/");
                      setSelectedFilter(value);
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
          </div>

          <div
            className={`${isStudio ? "z-0" : "z-50"}  text-white p-8 w-full fixed top-0  items-center justify-between font-karantina hidden lg:flex`}
          >
            <Link href="/">
              <Image
                src="/chromalogo2.png"
                alt="Logo"
                width={200}
                height={100}
              />
            </Link>
            <div className="flex items-center justify-between  w-[40%] h-10 space-x-0 relative rounded-sm shadow-2xl text-lg">
              {filterButtons.map((item) => {
                const value = item.toLowerCase() as Category;
                return (
                  <NavItem
                    pathname={pathname}
                    key={item}
                    name={item.toUpperCase()}
                    onClick={() => {
                      if (pathname === "/") {
                        setSelectedFilter(value);
                      } else {
                        router.push("/");
                        setSelectedFilter(value);
                      }
                    }}
                  />
                );
              })}
              {navItems.map((item) => (
                <NavItem
                  pathname={pathname}
                  key={item.name}
                  name={item.name}
                  onClick={() => {
                    router.push(item.href);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
