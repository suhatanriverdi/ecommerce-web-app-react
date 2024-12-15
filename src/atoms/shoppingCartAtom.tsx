import { atom } from "jotai";

export type ItemOrder = {
  id: number;
  amount: number;
  singleItemPrice: number;
  totalCost?: number;
  name: string;
  size: string;
  img_url: string;
};

// Shopping Cart Atom
export const shoppingCartAtom = atom<Map<number, Map<string, ItemOrder>>>(
  new Map(),
);
