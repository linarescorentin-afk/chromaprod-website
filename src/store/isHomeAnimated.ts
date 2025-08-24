import { create } from "zustand";

type useIsHomeAnimated = {
  isHomeAnimated: boolean;
  setIsHomeAnimated: (isHomeAnimated: boolean) => void;
};

export const useIsHomeAnimated = create<useIsHomeAnimated>((set) => ({
  isHomeAnimated: false,
  setIsHomeAnimated: (isHomeAnimated) => set({ isHomeAnimated }),
}));
