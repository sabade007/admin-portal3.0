// src/lib/fontUtils.ts

export type FontSize = "sm" | "md" | "lg";

export const getHeadingClass = (fontsize: FontSize): string => {
  return (
    {
      lg: "largeheading",
      md: "normalheading",
      sm: "smallheading",
    }[fontsize] || "normalheading"
  );
};

export const getSubheadingClass = (fontsize: FontSize): string => {
  return (
    {
      lg: "largesubheading",
      md: "normalsubheading",
      sm: "smallsubheading",
    }[fontsize] || "normalsubheading"
  );
};

export const getParagraphClass = (fontsize: FontSize): string => {
  return (
    {
      lg: "largeparagraph",
      md: "normalparagraph",
      sm: "smallparagraph",
    }[fontsize] || "normalparagraph"
  );
};
