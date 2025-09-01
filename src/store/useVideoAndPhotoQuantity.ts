export type VideoAndPhotoQuantityType = {
  videoQuantity: number;
  photoQuantity: number;
  setVideoQuantity: (quantity: number) => void;
  setPhotoQuantity: (quantity: number) => void;
};

import { create } from "zustand";

export const useVideoAndPhotoQuantity = create<VideoAndPhotoQuantityType>(
  (set) => ({
    videoQuantity: 0,
    photoQuantity: 0,
    setVideoQuantity: (quantity) => set({ videoQuantity: quantity }),
    setPhotoQuantity: (quantity) => set({ photoQuantity: quantity }),
  }),
);
