"use client";
import React from "react";
import d from "@/assets/light/d.png";
import Subheading from "../themes/SubHeading";
import Searchbar from "./header/Searchbar";
import Profile from "./header/Profile";
import { useTranslations } from "next-intl";

const WorkspaceHeader = () => {
  const t = useTranslations("WorkSpace");

  return (
    <div className="w-full h-[60px] grid grid-cols-4 items-center">
      <div className="ml-4 flex flex-row items-center gap-4 col-span-1">
        <img src={d.src} alt="" className="h-[24px] w-auto" />
        <Subheading className="text-lg font-semibold">
          {t("Header.title")}
        </Subheading>
      </div>
      <div className="col-span-2">
        <Searchbar />
      </div>
      <div className="col-span-1 items-end flex flex-col">
        <div className="mr-4">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
