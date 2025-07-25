import Heading from "@/components/themes/Heading";
import Subheading from "@/components/themes/SubHeading";
import { Tab, Tabs } from "@heroui/react";
import React from "react";
import RoleControl from "./RoleControl";
import ApplicationControl from "./ApplicationControl";
import { useTranslations } from "next-intl";
import { getCookie, setCookie } from "cookies-next";

const AppControl = () => {
  const t = useTranslations("AppControl");

  // Get initial tab from cookie, default to "rbac"
  const initialTab = ((): string => {
    const cookieTab = getCookie("appControlTab");
    return typeof cookieTab === "string" ? cookieTab : "rbac";
  })();

  const [selectedTab, setSelectedTab] = React.useState<string>(initialTab);

  const handleTabChange = (key: React.Key) => {
    const tabKey = key.toString();
    setSelectedTab(tabKey);
    setCookie("appControlTab", tabKey, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
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
        <Tab key="rbac" title={<Subheading>{t("title1")}</Subheading>}>
          <RoleControl />
        </Tab>
        <Tab key="applications" title={<Subheading>{t("title2")}</Subheading>}>
          <ApplicationControl />
        </Tab>
      </Tabs>
    </div>
  );
};

export default AppControl;
