import Heading from "@/components/themes/Heading";
import Subheading from "@/components/themes/SubHeading";
import { Tab, Tabs } from "@heroui/react";
import React from "react";

import { useTranslations } from "next-intl";
import { getCookie, setCookie } from "cookies-next";
import AdminActivity from "./AdminActivity";
import UserActivity from "./UserActivity";

const Activity = () => {
  const t = useTranslations("Activity");

  // Get initial tab from cookie, default to "rbac"
  const initialTab = ((): string => {
    const cookieTab = getCookie("activityTab");
    return typeof cookieTab === "string" ? cookieTab : "admin";
  })();

  const [selectedTab, setSelectedTab] = React.useState<string>(initialTab);

  const handleTabChange = (key: React.Key) => {
    const tabKey = key.toString();
    setSelectedTab(tabKey);
    setCookie("activityTab", tabKey, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
  };

  return (
    <div className="p-4">
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
        aria-label="Options"
        variant="underlined"
        className="w-full"
        classNames={{
          tabContent: "group-data-[selected=true]:text-iconcolor ",
          tabList:
            "text-textcolor  rounded-xl font-semibold border dark:border-zinc-800 p-0",
        }}
      >
        <Tab key="admin" title={<Subheading>{t("title1")}</Subheading>}>
          <AdminActivity />
        </Tab>
        <Tab key="user" title={<Subheading>{t("title2")}</Subheading>}>
          <UserActivity />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Activity;
