// hooks/useItemParallax.ts
"use client";

import { RefObject, useLayoutEffect, useMemo, useState } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

export function useItemParallax(
  targetRef: RefObject<HTMLElement>,
  intensity: number = 0.25, // 25% de la hauteur de l'item
): MotionValue<number> {
  // 1) Progression de scroll relative à l'élément
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Quand le haut de l'item touche le bas du viewport -> 0
    // Quand le bas de l'item touche le haut du viewport -> 1
    offset: ["start end", "end start"],
  });

  // 2) Mesurer la hauteur réelle de l'élément
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect?.height ?? 0;
      setHeight(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [targetRef]);

  // 3) Distance de déplacement en fonction de la hauteur
  const distance = useMemo(() => height * intensity, [height, intensity]);

  // 4) Mapping de 0→1 vers -distance→+distance
  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance - 90, distance],
  );

  // Optionnel : un petit ressort pour adoucir
  const y = useSpring(yRaw, { stiffness: 120, damping: 22, mass: 0.2 });

  return y;
}
