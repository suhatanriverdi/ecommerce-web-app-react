import { atom } from "jotai";

// Offset Query Atom
export const darkModeAtom = atom<boolean>(
  localStorage.getItem("theme") === "dark",
);
