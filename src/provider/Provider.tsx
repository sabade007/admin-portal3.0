"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { getCookie } from "cookies-next";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    const getTheme = async () => {
      const theme = await getCookie("theme");
      if (theme) {
        setThemeName(theme);
      } else {
        setThemeName("coral");
      }
      setIsMounted(true);
    };
    getTheme();
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={themeName === "" ? "coral" : themeName}
      themes={["light", "dark", "mint", "artic", "rose", "coral", "lilac"]}
    >
      <HeroUIProvider>
        <ToastProvider
          placement="top-center"
          toastOffset={10}
          toastProps={{
            variant: "flat",
            timeout: 4000,
            shouldShowTimeoutProgress: true,
          }}
        />
        {children}
      </HeroUIProvider>
    </ThemeProvider>
  );
};

export default Provider;
