import Heading from "@/components/themes/Heading";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import React from "react";
import SuiteAppsMob from "./SuiteAppsMob";
import MyAppsMob from "./MyAppsMob";
import WorkspaceSettingsMob from "./WorkspaceSettingsMob";

const WorkspaceMobContent = () => {
  const { currentMobileTab } = useWorkspaceStore();

  return (
    <div>
      {currentMobileTab === "suitemob" && <SuiteAppsMob />}
      {currentMobileTab === "myappsmob" && <MyAppsMob />}
      {currentMobileTab === "settingsmob" && <WorkspaceSettingsMob />}
    </div>
  );
};

export default WorkspaceMobContent;
