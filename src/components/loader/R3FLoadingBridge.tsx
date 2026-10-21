// R3FLoadingBridge.tsx
"use client";
import { useEffect } from "react";

export function R3FLoadingBridge({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    // Appelé dès que Suspense a fini de charger toutes les textures Three.js
    const timer = setTimeout(() => {
      onDone();
    }, 50);
    return () => clearTimeout(timer);
  }, [onDone]);

  return null;
}
