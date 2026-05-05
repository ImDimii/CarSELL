import { create } from "zustand";
import { Filters } from "@/lib/types";

interface FilterState {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {};

export const useFilterStore = create<FilterState>((set) => ({
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
