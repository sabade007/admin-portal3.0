import React from "react";
import {
  Button as HeroUiButton,
  ButtonProps as HeroUiButtonProps,
} from "@heroui/react";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import useFontSizeStore from "@/store/ux/useFontsizeStore";

interface CustomButtonProps extends HeroUiButtonProps {
  children?: React.ReactNode;
  isIconOnly?: boolean;
}
const Button: React.FC<CustomButtonProps> = ({
  children,
  isIconOnly = false,
  className,
  ...props
}) => {
  const { themeType } = useThemetypeStore();
  const { fontsize } = useFontSizeStore();

  const variant =
    themeType === "dense"
      ? "solid"
      : themeType === "outlined"
      ? "bordered"
      : "flat";

  const themeClass =
    themeType === "dense"
      ? "text-buttontext font-semibold tracking-wide"
      : themeType === "outlined"
      ? "border  border-zinc-300 dark:border-zinc-800 font-semibold tracking-wide"
      : "font-semibold  tracking-wide";

  return (
    <HeroUiButton
      variant={variant}
      className={`${themeClass} ${className ?? ""}`}
      size={fontsize}
      isIconOnly={isIconOnly}
      {...props}
    >
      {children}
    </HeroUiButton>
  );
};

export default Button;
