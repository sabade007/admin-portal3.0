"use client";

import { getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

export type FontSize = "sm" | "md" | "lg";

interface FontSizeStore {
  fontsize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const getInitialFontSize = (): FontSize => {
  const cookieValue = getCookie("fontsize");
  if (cookieValue === "sm" || cookieValue === "md" || cookieValue === "lg") {
    return cookieValue;
  }
  return "sm"; // default
};

const useFontSizeStore = create<FontSizeStore>((set) => ({
  fontsize: getInitialFontSize(),
  setFontSize: (size) => {
    setCookie("fontsize", size, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    set({ fontsize: size });
  },
}));

export default useFontSizeStore;
