import { create } from "zustand";

export type SelectedLanguageType = {
  selectedLanguage: "fr" | "en";
  setSelectedLanguage: (language: "fr" | "en") => void;
};

export const useIsSelectedLanguage = create<SelectedLanguageType>((set) => ({
  selectedLanguage: "fr",
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
}));
