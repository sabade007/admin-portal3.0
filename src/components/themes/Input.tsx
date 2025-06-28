"use client";

import React from "react";
import useFontSizeStore from "@/store/ux/useFontsizeStore";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import { Input as HeroInput, InputProps } from "@heroui/react";

interface CustomInputProps extends InputProps {}

const Input: React.FC<CustomInputProps> = ({ className = "", ...props }) => {
  const { fontsize } = useFontSizeStore();
  const { themeType } = useThemetypeStore();

  const themeClass =
    themeType === "dense"
      ? "border min-h-8 border-default/10 bg-default/10 dark:border-default/30 dark:bg-default/30 shadow-sm"
      : themeType === "outlined"
      ? "min-h-8 border border-zinc-300 dark:border-zinc-800 shadow-sm"
      : "min-h-8 shadow-sm bg-default/5 dark:bg-default/30 ";

  return (
    <HeroInput
      radius="md"
      labelPlacement="outside"
      size={fontsize === "sm" ? "sm" : "md"}
      classNames={{
        inputWrapper: `${themeClass}`,
      }}
      className={`max-w-xs  ${className}`}
      {...props}
    />
  );
};

export default Input;
