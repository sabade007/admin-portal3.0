import Heading from "@/components/themes/Heading";
import Subheading from "@/components/themes/SubHeading";
import { Tab, Tabs } from "@heroui/react";
import React from "react";

import { useTranslations } from "next-intl";
import { getCookie, setCookie } from "cookies-next";
import IamUsers from "./IamUsers";
import RegisteredUsers from "./RegisteredUsers";
import AdminAddedusers from "./AdminAddedusers";
import BlockedUsers from "./BlockedUsers";

const Activity = () => {
  const t = useTranslations("UserStore");

  // Get initial tab from cookie, default to "rbac"
  const initialTab = ((): string => {
    const cookieTab = getCookie("userStoreTab");
    return typeof cookieTab === "string" ? cookieTab : "iam";
  })();

  const [selectedTab, setSelectedTab] = React.useState<string>(initialTab);

  const handleTabChange = (key: React.Key) => {
    const tabKey = key.toString();
    setSelectedTab(tabKey);
    setCookie("userStoreTab", tabKey, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
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
        <Tab key="iam" title={<Subheading>{t("title1")}</Subheading>}>
          <IamUsers />
        </Tab>
        {/* <Tab key="registered" title={<Subheading>{t("title2")}</Subheading>}>
          <RegisteredUsers />
        </Tab>
        <Tab key="admin" title={<Subheading>{t("title3")}</Subheading>}>
          <AdminAddedusers />
        </Tab> */}
        <Tab key="blocked" title={<Subheading>{t("title4")}</Subheading>}>
          <BlockedUsers />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Activity;
