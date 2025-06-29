import { Switch as BaseSwitch } from "@heroui/react";
import React from "react";
import { cn } from "@/lib/utils"; // Replace or define if not already available

interface SwitchProps {
  isSelected: boolean;
  onValueChange: (value: boolean) => void;
  label: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  isSelected,
  onValueChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <BaseSwitch
      isSelected={isSelected}
      onValueChange={onValueChange}
      isDisabled={disabled}
      className={cn("max-w-xs", className)}
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-xs items-center justify-between cursor-pointer",
          "rounded-lg gap-2 p-4 border border-border"
        ),
        wrapper: cn(
          "relative w-10 h-6 rounded-full transition-colors",
          "bg-gray-300",
          "group-data-[selected=true]:bg-default/80"
        ),
        thumb: cn(
          "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md border transition-transform duration-200",
          //"group-data-[selected=true]:translate-x-[1.25rem]",
          "group-data-[pressed=true]:scale-105"
        ),
      }}
      size="sm"
    >
      {label}
    </BaseSwitch>
  );
};

export default Switch;
