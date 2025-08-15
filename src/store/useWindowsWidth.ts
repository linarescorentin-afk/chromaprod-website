import { create } from "zustand";

type windowWidthStore = {
  windowWidth: number;
  setWindowWidth: (width: number) => void;
};

export const useWindowsWidth = create<windowWidthStore>((set) => ({
  windowWidth: 0,
  setWindowWidth: (width) => set({ windowWidth: width }),
}));
