"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";

import {
  AudioLines,
  Flower2,
  LeafyGreen,
  Moon,
  Palette,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import Button from "../themes/Button";
import { useTranslations } from "next-intl";
import Paragraph from "../themes/Paragraph";
import useThemetypeStore from "@/store/ux/useThemetypeStore";

type ThemeKey =
  | "light"
  | "dark"
  | "mint"
  | "rose"
  | "artic"
  | "coral"
  | "lilac";

interface CustomProps {
  isDropdowntype?: boolean;
}

const ThemeSwitch = ({ isDropdowntype }: CustomProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Ux");
  const { themeType } = useThemetypeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (key: string | number) => {
    const selectedTheme = key as ThemeKey;
    setTheme(selectedTheme);
    setCookie("theme", selectedTheme, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  };

  if (!mounted) return null;

  return (
    <div>
      <Dropdown size="sm">
        <DropdownTrigger>
          <Button size="sm" isIconOnly={!isDropdowntype}>
            <Palette className="w-6 h-6" />
            {isDropdowntype && <span>{t("ThemeSelector.title")}</span>}
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
          onAction={handleThemeChange}
          aria-label="Static Actions"
        >
          {[
            {
              key: "light",
              icon: <Sun className="text-neutral-500 w-4 h-4" />,
              label: t("ThemeSelector.light"),
            },
            {
              key: "dark",
              icon: <Moon className="text-black w-4 h-4" />,
              label: t("ThemeSelector.dark"),
            },
            {
              key: "mint",
              icon: <LeafyGreen className="text-green-500 w-4 h-4" />,
              label: t("ThemeSelector.mint"),
            },
            {
              key: "rose",
              icon: <Flower2 className="text-rose-500 w-4 h-4" />,
              label: t("ThemeSelector.rose"),
            },
            {
              key: "artic",
              icon: <Waves className="text-sky-500 w-4 h-4" />,
              label: t("ThemeSelector.artic"),
            },
            {
              key: "coral",
              icon: <Sparkles className="text-orange-500 w-4 h-4" />,
              label: t("ThemeSelector.coral"),
            },
            {
              key: "lilac",
              icon: <AudioLines className="text-violet-500 w-4 h-4" />,
              label: t("ThemeSelector.lilac"),
            },
          ].map(({ key, icon, label }) => (
            <DropdownItem key={key}>
              <div className="flex gap-1 items-center">
                {icon}
                <Paragraph>{label}</Paragraph>
                {theme === key && (
                  <div className="bg-iconcolor p-1 rounded-full ml-auto"></div>
                )}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ThemeSwitch;
