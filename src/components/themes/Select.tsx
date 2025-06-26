"use client";

import React from "react";
import useFontSizeStore from "@/store/ux/useFontsizeStore";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import { Select as HeroSelect, SelectProps } from "@heroui/react";

interface CustomSelectProps extends SelectProps {}

const Select: React.FC<CustomSelectProps> = ({ className = "", ...props }) => {
  const { fontsize } = useFontSizeStore();
  const { themeType } = useThemetypeStore();

  const themeClass =
    themeType === "dense"
      ? "border min-h-10 border-default/10 bg-default/10 dark:border-default/30 dark:bg-default/30 shadow-sm"
      : themeType === "outlined"
      ? "min-h-10 border border-zinc-300 dark:border-zinc-800 shadow-sm"
      : "min-h-10 shadow-sm bg-default/5 dark:bg-default/30";

  return (
    <HeroSelect
      radius="md"
      size={fontsize}
      labelPlacement="outside"
      classNames={{
        trigger: `${themeClass}`, // styling the select button
      }}
      className={`max-w-xs ${className}`}
      {...props}
    />
  );
};

export default Select;
