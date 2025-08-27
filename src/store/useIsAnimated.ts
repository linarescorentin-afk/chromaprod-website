import { create } from "zustand";

type useIsAnimated = {
  isHomeAnimated: boolean;
  setIsHomeAnimated: (isHomeAnimated: boolean) => void;
  isAboutAnimated: boolean;
  setIsAboutAnimated: (isAboutAnimated: boolean) => void;
  isContactAnimated: boolean;
  setIsContactAnimated: (isContactAnimated: boolean) => void;
  isNavBarAnimated: boolean;
  setIsNavBarAnimated: (isNavBarAnimated: boolean) => void;
};

export const useIsAnimated = create<useIsAnimated>((set) => ({
  isHomeAnimated: false,
  setIsHomeAnimated: (isHomeAnimated) => set({ isHomeAnimated }),
  isAboutAnimated: false,
  setIsAboutAnimated: (isAboutAnimated) => set({ isAboutAnimated }),
  isContactAnimated: false,
  setIsContactAnimated: (isContactAnimated) => set({ isContactAnimated }),
  isNavBarAnimated: false,
  setIsNavBarAnimated: (isNavBarAnimated) => set({ isNavBarAnimated }),
}));
