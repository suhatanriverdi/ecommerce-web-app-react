import { atom } from "jotai";
import Product from "../supabase/model/Product.ts";

// Products Atom
export const selectedProductAtom = atom<Product>();
