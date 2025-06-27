import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import React from "react";
import SuiteApps from "./suiteapps/SuiteApps";
import MyApps from "./myapps/MyApps";

const WorkspaceContent = () => {
  const { currentTab } = useWorkspaceStore();

  return (
    <div>
      {currentTab === "suite" && <SuiteApps />}
      {currentTab === "myapps" && <MyApps />}
      {currentTab === "dashboard" && <div>Dashboard</div>}
      {currentTab === "applicationcontrol" && <div>ApplicationControl</div>}
      {currentTab === "activity" && <div>Activity</div>}
      {currentTab === "userstore" && <div>UserStore</div>}
      {currentTab === "advanced" && <div>Settings</div>}
    </div>
  );
};

export default WorkspaceContent;
