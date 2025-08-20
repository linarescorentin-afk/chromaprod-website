import { create } from "zustand";

type useIsEnterState = {
  isEnter: boolean;
  setIsEnter: (isEnter: boolean) => void;
};

export const useIsEnterState = create<useIsEnterState>((set) => ({
  isEnter: false,
  setIsEnter: (isEnter) => set({ isEnter }),
}));
