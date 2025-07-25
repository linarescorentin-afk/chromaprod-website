"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { FC } from "react";

const LenisProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
