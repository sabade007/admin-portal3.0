"use client";
import {
  History,
  LayoutDashboard,
  Settings,
  SquircleDashed,
  TriangleDashed,
  UserSearch,
} from "lucide-react";
import React, { use, useEffect, useState } from "react";
import Tiny from "../themes/Tiny";
import useThemeColor from "@/hooks/useThemeColor";
import ThemeSwitch from "../ux/ThemeSwitch";
import { motion } from "framer-motion";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import ThemetypeSelector from "../ux/ThemetypeSelector";
import { useTranslations } from "next-intl";

const lineVariants = {
  initial: { height: 0 },
  hover: { height: 50 },
  selected: { height: 30 },
};

const SidebarItem = ({
  icon,
  label,
  selected,
  themeColor,
  themeType,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
  themeColor: string;
  themeType: any;
}) => {
  const isDense = themeType === "dense";
  const isMinimal = themeType === "minimal";
  const backgroundColor = selected && isDense ? `${themeColor}1A` : undefined; // '1A' ~ 10% alpha
  const textColor = selected && (isDense || isMinimal) ? themeColor : undefined;

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      animate={selected ? "selected" : "initial"}
      onClick={onClick}
      className={`relative w-full   rounded-xl  flex flex-col items-center justify-center gap-1 cursor-pointer ${
        selected ? "bg-transparent" : ""
      }`}
    >
      {/* Left vertical line */}
      <motion.div
        variants={lineVariants}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        style={{
          backgroundColor: themeColor,
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "4px",
          borderRadius: "1px",
        }}
      />
      <div
        className="flex flex-col items-center py-2  justify-center gap-1 w-full h-full rounded-md"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        {icon}
        <Tiny
          className={`${
            selected ? "font-semibold" : ""
          } text-center  text-[10px] ml-1`}
        >
          {label}
        </Tiny>
      </div>
    </motion.div>
  );
};

const WorkspaceSidebar = () => {
  const { currentTab, setCurrentTab } = useWorkspaceStore();
  const { themeType } = useThemetypeStore();
  const themeColor = useThemeColor();
  const t = useTranslations("WorkSpace");

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const allItems = [
    {
      key: "suite",
      label: t("Sidebar.suite"),
      icon: <SquircleDashed className="w-5 h-5" />,
    },
    {
      key: "myapps",
      label: t("Sidebar.apps"),
      icon: <TriangleDashed className="w-5 h-5" />,
    },
    {
      key: "dashboard",
      label: t("Sidebar.dashboard"),
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      key: "applicationcontrol",
      label: t("Sidebar.applicationcontrol"),
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      key: "userstore",
      label: t("Sidebar.userstore"),
      icon: <UserSearch className="w-5 h-5" />,
    },
    {
      key: "activity",
      label: t("Sidebar.activity"),
      icon: <History className="w-5 h-5" />,
    },
    {
      key: "advanced",
      label: t("Sidebar.advanced"),
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const visibleItems = userRole === "ADMIN" ? allItems : allItems.slice(0, 2);

  return (
    <div className="flex flex-col max-h-[calc(100dvh-60px)] overflow-y-auto scrollbar-hide  gap-1">
      {/* {items.map((item) => (
        <SidebarItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          selected={currentTab === item.key}
          onClick={() => setCurrentTab(item.key)}
          themeColor={themeColor}
          themeType={themeType}
        />
      ))} */}

      {visibleItems.map((item) => (
        <SidebarItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          selected={currentTab === item.key}
          onClick={() => setCurrentTab(item.key)}
          themeColor={themeColor}
          themeType={themeType}
        />
      ))}
    </div>
  );
};

export default WorkspaceSidebar;
// h-
