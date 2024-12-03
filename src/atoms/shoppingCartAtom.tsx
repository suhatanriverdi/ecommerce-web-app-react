import { atom } from "jotai";
import Product from "../supabase/model/Product.ts";

export type ItemOrder = {
  product: Product;
  amount: number;
  size: string;
};

// Products Atom
export const shoppingCartAtom = atom<Map<number, Map<string, ItemOrder>>>(
  new Map(),
);
