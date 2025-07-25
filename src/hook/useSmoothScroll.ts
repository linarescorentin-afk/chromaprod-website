// hooks/useSmoothScroll.ts
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export const useSmoothScroll = (ref: React.RefObject<HTMLElement>) => {
  const scrollY = useMotionValue(0);
  const smoothY = useSpring(scrollY, {
    damping: 20,
    stiffness: 150,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      scrollY.set(el.scrollTop);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [ref, scrollY]);

  return smoothY;
};
