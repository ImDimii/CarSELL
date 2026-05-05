import { create } from "zustand";
import { Car } from "@/lib/types";

interface WishlistState {
  items: Car[];
  isOpen: boolean;
  addItem: (car: Car) => void;
  removeItem: (id: string) => void;
  toggleItem: (car: Car) => void;
  isInWishlist: (id: string) => boolean;
  setOpen: (open: boolean) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (car) =>
    set((state) => {
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
      get().addItem(car);
    }
  },
  isInWishlist: (id) => get().items.some((c) => c.id === id),
  setOpen: (open) => set({ isOpen: open }),
}));
