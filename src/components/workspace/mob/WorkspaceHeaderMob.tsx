import React from "react";
import dryve from "@/assets/light/dryve.svg";
import Searchbarmob from "./Searchbarmob";

const WorkspaceHeaderMob = () => {
  return (
    <div className="flex flex-row items-center gap-4 w-full h-[60px]">
      <img src={dryve.src} alt="logo" className="h-[32px] w-auto ml-4 " />
      <Searchbarmob />
    </div>
  );
};

export default WorkspaceHeaderMob;
