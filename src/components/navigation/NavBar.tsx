"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import NavItem from "./NavItem";
import { Category, useFilterStore } from "@/store/useFilterStore";
import path from "path";
import { useEffect } from "react";
import Link from "next/link";

function NavBar() {
  const navItems = [{ name: "ABOUT", href: "/about" }];

  console.log(path);

  const router = useRouter();

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
        <div
          className={`${isStudio ? "z-0" : "z-50"}  text-white p-8 w-full fixed top-0 flex items-center justify-between font-karantina`}
        >
          <Link href="/">
            <Image src="/chromalogo2.png" alt="Logo" width={200} height={100} />
          </Link>
          <div className="text-2xl flex items-center justify-between  w-[40%] h-10 space-x-0 relative rounded-sm shadow-2xl">
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
      )}
    </>
  );
}

export default NavBar;
