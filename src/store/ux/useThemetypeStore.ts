"use client";

import { getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

export type ThemeType = "dense" | "minimal" | "outlined";

interface ThemeTypeState {
  themeType: ThemeType;
  setThemeType: (themeType: ThemeType) => void;
}

// Function to read from cookie safely
const getInitialThemeType = (): ThemeType => {
  const cookieValue = getCookie("themeType");
  if (
    cookieValue === "dense" ||
    cookieValue === "minimal" ||
    cookieValue === "outlined"
  ) {
    return cookieValue;
  }
  return "outlined"; // default fallback
};

const useThemetypeStore = create<ThemeTypeState>((set) => ({
  themeType: getInitialThemeType(),
  setThemeType: (themeType) => {
    setCookie("themeType", themeType, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
    set({ themeType });
  },
}));

export default useThemetypeStore;
