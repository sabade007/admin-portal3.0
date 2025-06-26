// store/useLocaleStore.ts
import { create } from "zustand";
import { getCookie, setCookie } from "cookies-next";

type LocaleState = {
  locale: string;
  setLocale: (locale: string) => void;
};

const useLocaleStore = create<LocaleState>((set) => ({
  locale: (getCookie("locale") as string) || "en",
  setLocale: (locale) => {
    setCookie("locale", locale, { maxAge: 60 * 60 * 24 * 365 });
    set({ locale });
  },
}));

export default useLocaleStore;
