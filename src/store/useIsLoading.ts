import { create } from "zustand";

type LoadingState = {
  isVideoLoading: boolean;
  setIsVideoLoading: (isLoading: boolean) => void;
  isVideoCanvasLoading: boolean;
  setIsVideoCanvasLoading: (isLoading: boolean) => void;
  isPhotoLoading: boolean;
  setIsPhotoLoading: (isLoading: boolean) => void;
  isPhotoCanvasLoading: boolean;
  setIsPhotoCanvasLoading: (isLoading: boolean) => void;
  getAllReady: () => boolean;
};

export const useIsLoading = create<LoadingState>((set, get) => ({
  isVideoLoading: true,
  setIsVideoLoading: (isLoading) => set({ isVideoLoading: isLoading }),
  isVideoCanvasLoading: true,
  setIsVideoCanvasLoading: (isLoading) =>
    set({ isVideoCanvasLoading: isLoading }),
  isPhotoLoading: true,
  setIsPhotoLoading: (isLoading) => set({ isPhotoLoading: isLoading }),
  isPhotoCanvasLoading: true,
  setIsPhotoCanvasLoading: (isLoading) =>
    set({ isPhotoCanvasLoading: isLoading }),

  // helper (facultatif) :
  getAllReady: () => {
    const s = get();
    return (
      !s.isVideoLoading &&
      !s.isPhotoLoading &&
      !s.isVideoCanvasLoading &&
      !s.isPhotoCanvasLoading
    );
  },
}));
