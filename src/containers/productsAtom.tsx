import { atom } from "jotai";
import Product from "../supabase/model/Product";

// Products Atom
export const productsAtom = atom<Product[]>([]);
