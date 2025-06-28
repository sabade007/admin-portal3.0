import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import React from "react";
import SuiteApps from "./suiteapps/SuiteApps";
import MyApps from "./myapps/MyApps";
import AdminDashboard from "./admindashboard/AdminDashboard";
import AdvancedSettings from "./settings/AdvancedSettings";

const WorkspaceContent = () => {
  const { currentTab } = useWorkspaceStore();

  return (
    <div>
      {currentTab === "suite" && <SuiteApps />}
      {currentTab === "myapps" && <MyApps />}
      {currentTab === "dashboard" && <AdminDashboard />}
      {currentTab === "applicationcontrol" && <div>ApplicationControl</div>}
      {currentTab === "activity" && <div>Activity</div>}
      {currentTab === "userstore" && <div>UserStore</div>}
      {currentTab === "advanced" && <AdvancedSettings />}
    </div>
  );
};

export default WorkspaceContent;
