// hooks/useScrollActive.ts
"use client";

import { useEffect, useState } from "react";

export default function useScrollActive(idleDelay: number = 1250) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), idleDelay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [idleDelay]);

  return isScrolling;
}
