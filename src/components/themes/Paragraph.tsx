"use client";
import React, { HTMLAttributes } from "react";
import { getParagraphClass } from "@/lib/fontUtils";
import useFontSizeStore from "@/store/ux/useFontsizeStore";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  justify?: string;
}

export default function Paragraph({
  children,
  justify,
  ...props
}: ParagraphProps) {
  const fontsize = useFontSizeStore((state) => state.fontsize);
  return (
    <p className={`${getParagraphClass(fontsize)} ${justify}`} {...props}>
      {children}
    </p>
  );
}
