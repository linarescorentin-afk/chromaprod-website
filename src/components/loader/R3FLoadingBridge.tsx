// R3FLoadingBridge.tsx
"use client";
import { useEffect, useRef } from "react";
import { useProgress, Preload } from "@react-three/drei";

export function R3FLoadingBridge({ onDone }: { onDone: () => void }) {
  const { active, total } = useProgress();
  const doneOnce = useRef(false);

  // Quand active === false et total > 0, tous les assets enregistrés sont chargés
  useEffect(() => {
    if (!doneOnce.current && !active && total > 0) {
      doneOnce.current = true;
      onDone();
    }
  }, [active, total, onDone]);

  return <Preload all />; // précharge tout ce qui est dans la scène
}
