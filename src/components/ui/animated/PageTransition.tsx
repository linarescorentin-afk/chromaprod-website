"use client";
import React, { useEffect, useState } from "react";
import AnimUp from "../animated/AnimUp";
import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";

function PageTransition({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: string;
}) {
  const [translatePage, setTranslatePage] = useState(false);
  const pathName = usePathname();

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const generatePathName = (pathName: string) => {
    const array = pathName.split("");
    array.shift();

    let foundSlash = false;
    const result = [];

    if (array.length === 0) {
      return "HOME";
    } else {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === "/") {
          foundSlash = true;
          continue; // Passe à l'élément suivant après avoir trouvé "/"
        }

        if (foundSlash) {
          result.push(array[i]);
        }
      }

      if (foundSlash) {
        return result.join("");
      } else {
        return array.join("");
      }
    }
  };

  useEffect(() => {
    generatePathName(pathName);

    setTimeout(() => {
      setTranslatePage(true);
    }, 1500);
  }, [pathName]);

  console.log(
    "PageTransition render with pathName:",
    pathName,
    "and value:",
    value,
  );

  return (
    <>
      <div
        ref={ref}
        className="page-transition fixed z-50 flex h-screen w-full items-center justify-center bg-black"
      >
        <AnimUp inView={inView} duration={1} y={100}>
          <h1 className="font-karantina text-[14rem] uppercase lg:text-[20rem]">
            {value
              ? value.toUpperCase()
              : generatePathName(pathName.toUpperCase())}
          </h1>
        </AnimUp>
      </div>
      <div
        className={`underpage-transition fixed z-40 flex h-screen w-full flex-col items-center justify-center bg-[#010101] text-white `}
      />
      {translatePage && <div>{children}</div>}
    </>
  );
}

export default PageTransition;
