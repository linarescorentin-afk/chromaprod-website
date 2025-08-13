"use client";

import { create } from "zustand";

export type Category = "all" | "corporate" | "events" | "socialMedia";

type FilterStore = {
  selectedFilter: Category;
  setSelectedFilter: (filter: Category) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  selectedFilter: "all",
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));
