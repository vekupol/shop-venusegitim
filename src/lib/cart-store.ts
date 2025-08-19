"use client";
import { create } from "zustand";

export type CartItem = { id: string; name: string; priceKurus: number; qty: number };

type CartState = {
  items: CartItem[];
  add: (i: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalKurus: () => number;
  count: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (i, qty = 1) => {
    const items = [...get().items];
    const ix = items.findIndex(x => x.id === i.id);
    if (ix > -1) items[ix] = { ...items[ix], qty: items[ix].qty + qty };
    else items.push({ ...i, qty });
    set({ items });
  },
  remove: (id) => set({ items: get().items.filter(x => x.id !== id) }),
  setQty: (id, qty) =>
    set({ items: get().items.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x) }),
  clear: () => set({ items: [] }),
  totalKurus: () => get().items.reduce((s, x) => s + x.priceKurus * x.qty, 0),
  count: () => get().items.reduce((s, x) => s + x.qty, 0),
}));
