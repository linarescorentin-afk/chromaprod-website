/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

const LenisProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024); // < lg
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile && pathname === "/") {
    // 🚫 pas de Lenis
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{ lerp: 0.025, duration: 2.5, smoothWheel: true }}
    >
      {children as any}
    </ReactLenis>
  );
};

export default LenisProvider;
