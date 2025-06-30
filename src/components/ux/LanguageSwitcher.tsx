"use client";

import useLocaleStore from "@/store/ux/useLocaleStore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react"; // or "@heroui/react"
import { useTranslations } from "next-intl";
import { setCookie } from "cookies-next";
import { Globe2 } from "lucide-react";
import Button from "../themes/Button";
import Paragraph from "../themes/Paragraph";
import useThemetypeStore from "@/store/ux/useThemetypeStore";

interface LanguageOption {
  key: string;
  label: string;
}

interface LanguageSwitcherProps {
  isDropdowntype?: boolean;
  isFullWidth?: boolean;
}

export default function LanguageSwitcher({
  isDropdowntype,
  isFullWidth,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocaleStore();
  const t = useTranslations("Ux");
  const { themeType } = useThemetypeStore();

  const languages: LanguageOption[] = [
    { key: "en", label: "English" },
    { key: "sn", label: "ಕನ್ನಡ" },
  ];

  const handleChange = (key: string | number) => {
    const selectedLocale = key as string;
    setLocale(selectedLocale);
    setCookie("locale", selectedLocale, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  };

  return (
    <Dropdown size="lg">
      <DropdownTrigger>
        <Button
          size="sm"
          className={`${isFullWidth && "w-full"}`}
          isIconOnly={!isDropdowntype}
        >
          {isFullWidth ? (
            <div className="flex flex-row items-center w-full gap-2 justify-start text-left">
              <Globe2 className="w-4 h-4" />
              {isDropdowntype && <span>{t("LanguageSelector.title")}</span>}
            </div>
          ) : (
            <>
              <Globe2 className="w-4 h-4" />
              {isDropdowntype && <span>{t("LanguageSelector.title")}</span>}
            </>
          )}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Language Switcher"
        className="font-semibold"
        onAction={handleChange}
        variant={
          themeType === "dense"
            ? "solid"
            : themeType === "outlined"
            ? "bordered"
            : "flat"
        }
      >
        {languages.map(({ key, label }) => (
          <DropdownItem key={key}>
            <div className="flex gap-2 items-center justify-between">
              <Paragraph>{label}</Paragraph>
              {locale === key && (
                <div className="bg-iconcolor rounded-full p-1"></div>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
