import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const themeColorMap: Record<string, string> = {
  light: "#0A1153",
  dark: "#a1a1aa",
  mint: "#84cc16",
  artic: "#38bdf8",
  rose: "#f43f5e",
  coral: "#f97316",
  lilac: "#c084fc",
};

export default function useThemeColor() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#f87171"); // fallback color

  useEffect(() => {
    setColor(themeColorMap[theme as string] || "#f87171");
  }, [theme]);

  return color;
}
