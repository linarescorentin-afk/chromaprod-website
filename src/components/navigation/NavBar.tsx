"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import { Category, useFilterStore } from "@/store/useFilterStore";

function NavBar() {
  const navItems = [
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const setSelectedFilter = useFilterStore((state) => state.setSelectedFilter);

  const filterButtons = ["All", "Corporate", "Events", "SocialMedia"];

  const pathname = usePathname();

  const isStudio = pathname.includes("/studio"); // ou pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && (
        <div
          className={`${isStudio ? "z-0" : "z-50"}  text-white p-8 w-full fixed top-0 flex items-center justify-between font-karantina`}
        >
          <Image src="/chromalogo2.png" alt="Logo" width={200} height={100} />
          <div className="text-2xl bg-white flex items-center justify-between text-black w-[40%] h-10 space-x-0 relative rounded-sm shadow-2xl">
            {filterButtons.map((item) => {
              const value = item.toLowerCase() as Category;
              return (
                <NavItem
                  key={item}
                  name={item}
                  onClick={() => {
                    setSelectedFilter(value);
                  }}
                />
              );
            })}
            {navItems.map((item) => (
              <NavItem key={item.name} name={item.name} onClick={() => {}} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
