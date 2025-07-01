"use client";
import {
  History,
  LayoutDashboard,
  LayoutGrid,
  LayoutPanelTop,
  LucideLayoutPanelLeft,
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
      className={`relative w-full  bg-background shadow-sm mb-1 border rounded-xl dark:border dark:border-zinc-800  flex flex-col items-center justify-center gap-1 cursor-pointer `}
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
          width: "3px",
          borderRadius: "2px",
        }}
      />
      <div
        className="flex   flex-col items-center py-2  justify-center gap-1 w-full h-full rounded-md"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        {icon}
        <p
          className={`${
            selected ? "font-semibold" : ""
          } text-center  text-[10px] ml-1 break-all  overflow-ellipsis `}
        >
          {label}
        </p>
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
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      key: "myapps",
      label: t("Sidebar.apps"),
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      key: "dashboard",
      label: t("Sidebar.dashboard"),
      icon: <LucideLayoutPanelLeft className="w-4 h-4" />,
    },
    {
      key: "applicationcontrol",
      label: t("Sidebar.applicationcontrol"),
      icon: <LayoutPanelTop className="w-4 h-4" />,
    },
    {
      key: "userstore",
      label: t("Sidebar.userstore"),
      icon: <UserSearch className="w-4 h-4" />,
    },
    {
      key: "activity",
      label: t("Sidebar.activity"),
      icon: <History className="w-4 h-4" />,
    },
    {
      key: "advanced",
      label: t("Sidebar.advanced"),
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const visibleItems = userRole === "ADMIN" ? allItems : allItems.slice(0, 2);

  return (
    <div className="flex flex-col max-h-[calc(100dvh-60px)] overflow-y-auto scrollbar-hide ml-1 gap-2">
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
