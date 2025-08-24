/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { FC } from "react";

const LenisProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
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
