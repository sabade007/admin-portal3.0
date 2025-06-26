import React from "react";
import LanguageSwitcher from "../ux/LanguageSwitcher";
import ThemeSwitch from "../ux/ThemeSwitch";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import FontSizeSelector from "../ux/FontsizeSelector";

const WorkspaceEndbar = () => {
  return (
    <div className="flex flex-col max-h-[calc(100dvh-60px)] overflow-y-auto scrollbar-hide mt-2  gap-4">
      <LanguageSwitcher />
      <ThemeSwitch />
      <ThemetypeSelector />
      <FontSizeSelector />
    </div>
  );
};

export default WorkspaceEndbar;
