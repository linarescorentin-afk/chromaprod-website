"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

function NavBar() {
  const navItems = [
    { name: "CORPORATE", href: "/" },
    { name: "SOCIALE MEDIA", href: "/about" },
    { name: "EVENTS", href: "/contact" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const pathname = usePathname();
  console.log(pathname);
  const isStudio = pathname.includes("/studio"); // ou pathname.startsWith("/studio");
  console.log(isStudio);
  return (
    <>
      {!isStudio && (
        <div
          className={`${isStudio ? "z-0" : "z-50"}  text-white p-8 w-full fixed top-0 flex items-center justify-between font-karantina`}
        >
          <Image src="/chromalogo2.png" alt="Logo" width={200} height={100} />
          <div className="text-2xl bg-white flex items-center justify-between text-black w-[40%] h-10 space-x-0 relative rounded-sm shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="text-black border-x border-black w-full h-full border-dashed"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
