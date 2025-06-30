import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import React from "react";
import SuiteApps from "./suiteapps/SuiteApps";
import MyApps from "./myapps/MyApps";
import AdminDashboard from "./admindashboard/AdminDashboard";
import AdvancedSettings from "./settings/AdvancedSettings";
import AppControl from "./appcontrol/AppControl";
import Activity from "./activity/Activity";
import UserStore from "./userstore/UserStore";

const WorkspaceContent = () => {
  const { currentTab } = useWorkspaceStore();

  return (
    <div>
      {currentTab === "suite" && <SuiteApps />}
      {currentTab === "myapps" && <MyApps />}
      {currentTab === "dashboard" && <AdminDashboard />}
      {currentTab === "applicationcontrol" && <AppControl />}
      {currentTab === "activity" && <Activity />}
      {currentTab === "userstore" && <UserStore />}
      {currentTab === "advanced" && <AdvancedSettings />}
    </div>
  );
};

export default WorkspaceContent;
