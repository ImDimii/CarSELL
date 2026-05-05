import { create } from "zustand";
import { Car } from "@/lib/types";

interface ComparisonState {
  items: Car[];
  isOpen: boolean;
  addItem: (car: Car) => void;
  removeItem: (id: string) => void;
  toggleItem: (car: Car) => void;
  isInComparison: (id: string) => boolean;
  setOpen: (open: boolean) => void;
  canAdd: () => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (car) =>
    set((state) => {
      if (state.items.length >= 3) return state;
      if (state.items.find((c) => c.id === car.id)) return state;
      return { items: [...state.items, car] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((c) => c.id !== id),
    })),
  toggleItem: (car) => {
    const exists = get().items.find((c) => c.id === car.id);
    if (exists) {
      get().removeItem(car.id);
    } else {
      if (get().canAdd()) get().addItem(car);
    }
  },
  isInComparison: (id) => get().items.some((c) => c.id === id),
  setOpen: (open) => set({ isOpen: open }),
  canAdd: () => get().items.length < 3,
}));
