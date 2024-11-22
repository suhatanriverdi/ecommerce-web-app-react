import { atom } from "jotai";
import { DEFAULT_OFFSET } from "../config/consts.ts";

// Offset Query Atom
export const scrollOffsetAtom = atom<number>(DEFAULT_OFFSET);
