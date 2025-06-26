import React from "react";
import Heading from "../themes/Heading";
import Paragraph from "../themes/Paragraph";
import FontSizeSelector from "../ux/FontsizeSelector";
import ThemeSwitch from "../ux/ThemeSwitch";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import LanguageSwitcher from "../ux/LanguageSwitcher";

interface SetupTabItemHeaderProps {
  image: React.ReactNode;
  heading: String;
  desc: String;
}

const SetupTabItemHeader = ({
  image,
  heading,
  desc,
}: SetupTabItemHeaderProps) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[calc(100%-50px)] flex flex-col gap-6 justify-center items-center">
        {image}
        <div className="flex flex-col  items-center">
          <Heading>{heading}</Heading>
          <Paragraph>{desc}</Paragraph>
        </div>
      </div>
      <div className="w-full h-[50px] flex flex-row gap-4  items-center justify-center">
        <FontSizeSelector />
        <ThemeSwitch />
        <ThemetypeSelector />
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default SetupTabItemHeader;
