"use client";
import React, { HTMLAttributes } from "react";
import { getSubheadingClass } from "@/lib/fontUtils";
import useFontSizeStore from "@/store/ux/useFontsizeStore";

interface SubheadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export default function Subheading({ children, ...props }: SubheadingProps) {
  const fontsize = useFontSizeStore((state) => state.fontsize);
  return (
    <h2 className={getSubheadingClass(fontsize)} {...props}>
      {children}
    </h2>
  );
}
