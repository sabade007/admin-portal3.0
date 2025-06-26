"use client";

import React, { useEffect } from "react";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { LayoutDashboard } from "lucide-react";
import Button from "../themes/Button";
import Paragraph from "../themes/Paragraph";

interface ThemetypeSelectorProps {
  isDropdowntype?: boolean;
}

interface ThemeOption {
  key: "dense" | "minimal" | "outlined";
  label: string;
}

export default function ThemetypeSelector({
  isDropdowntype,
}: ThemetypeSelectorProps) {
  const { themeType, setThemeType } = useThemetypeStore();
  const t = useTranslations("Ux");

  const themes: ThemeOption[] = [
    {
      key: "dense",
      label: t("ThemetypeSelector.dense"),
    },
    {
      key: "minimal",
      label: t("ThemetypeSelector.minimal"),
    },
    {
      key: "outlined",
      label: t("ThemetypeSelector.outlined"),
    },
  ];

  useEffect(() => {
    const storedTheme = getCookie("themeType");
    if (
      storedTheme === "dense" ||
      storedTheme === "minimal" ||
      storedTheme === "outlined"
    ) {
      setThemeType(storedTheme);
    }
  }, [setThemeType]);

  const handleChange = (key: string | number) => {
    const selectedTheme = key as "dense" | "minimal" | "outlined";
    setThemeType(selectedTheme);
    setCookie("themeType", selectedTheme, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  };

  return (
    <Dropdown size="lg">
      <DropdownTrigger>
        <Button size="sm" isIconOnly={!isDropdowntype}>
          <LayoutDashboard className="w-5 h-5" />
          {isDropdowntype && <span>{t("ThemetypeSelector.title")}</span>}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        variant={
          themeType === "dense"
            ? "solid"
            : themeType === "outlined"
            ? "bordered"
            : "flat"
        }
        aria-label="Theme Type Options"
        className="font-semibold"
        onAction={handleChange}
      >
        {themes.map(({ key, label }) => (
          <DropdownItem key={key}>
            <div className="flex gap-2 items-center justify-between">
              <Paragraph>{label}</Paragraph>
              {themeType === key && (
                <div className="bg-iconcolor rounded-full p-1"></div>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
