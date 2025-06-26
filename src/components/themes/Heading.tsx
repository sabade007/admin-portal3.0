"use client";
import React, { HTMLAttributes } from "react";
import { getHeadingClass } from "@/lib/fontUtils";
import useFontSizeStore from "@/store/ux/useFontsizeStore";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export default function Heading({ children, ...props }: HeadingProps) {
  const fontsize = useFontSizeStore((state) => state.fontsize);
  return (
    <h1 className={getHeadingClass(fontsize)} {...props}>
      {children}
    </h1>
  );
}
