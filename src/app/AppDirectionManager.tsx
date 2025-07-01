"use client";
import { useEffect } from "react";
import useLocaleStore from "@/store/ux/useLocaleStore";

const rtlLocales = ["ar", "he", "fa", "ur"];

export default function AppDirectionManager() {
  const { locale } = useLocaleStore();

  useEffect(() => {
    const isRtl = rtlLocales.includes(locale);
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", locale);
  }, [locale]);

  return null; // no UI needed
}
