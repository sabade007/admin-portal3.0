"use client";

import useFontSizeStore, { FontSize } from "@/store/ux/useFontsizeStore";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { setCookie } from "cookies-next";
// @ts-ignore
import { CheckCircle, TextCircle } from "solar-icons";
import React from "react";
import { useTranslations } from "next-intl";
import Button from "../themes/Button";
import { ALargeSmall, TextCursorIcon } from "lucide-react";
import Paragraph from "../themes/Paragraph";
import useThemetypeStore from "@/store/ux/useThemetypeStore";

interface FontSizeOption {
  key: FontSize;
  label: string;
  icon: React.ReactNode;
}

interface FontSizeSelectorProps {
  isDropdowntype?: boolean;
}

export default function FontSizeSelector({
  isDropdowntype,
}: FontSizeSelectorProps) {
  const { fontsize, setFontSize } = useFontSizeStore();
  const t = useTranslations("Ux");
  const { themeType } = useThemetypeStore();

  const sizes: FontSizeOption[] = [
    {
      key: "sm",
      label: t("FontsizeSelector.small"),
      icon: <ALargeSmall className="w-4 h-4 " />,
    },
    {
      key: "md",
      label: t("FontsizeSelector.medium"),
      icon: <ALargeSmall className="w-5 h-5 " />,
    },
    {
      key: "lg",
      label: t("FontsizeSelector.large"),
      icon: <ALargeSmall className="w-6 h-6 " />,
    },
  ];

  const handleAction = (key: string | number) => {
    const size = key as FontSize;
    setFontSize(size);
    setCookie("fontsize", size, { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  };

  return (
    <Dropdown size="lg">
      <DropdownTrigger>
        <Button size="sm" isIconOnly={!isDropdowntype}>
          <ALargeSmall className="w-6 h-6" />
          {isDropdowntype && <span>{t("FontsizeSelector.title")}</span>}
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
        aria-label="Font Size Options"
        className="font-semibold"
        onAction={handleAction}
      >
        {sizes.map(({ key, label, icon }) => (
          <DropdownItem key={key}>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                {icon}
                <Paragraph>{label}</Paragraph>
              </div>

              {fontsize === key && (
                <div className="bg-iconcolor rounded-full p-1"></div>
              )}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
