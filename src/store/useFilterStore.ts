"use client";

import { create } from "zustand";

export type Category = "all" | "corporate" | "events" | "socialMedia";

type FilterStore = {
  selectedFilter: Category | null;
  setSelectedFilter: (filter: Category | null) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  selectedFilter: "all",
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));
