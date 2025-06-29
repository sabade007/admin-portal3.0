import Heading from "@/components/themes/Heading";
import Subheading from "@/components/themes/SubHeading";
import { Tab, Tabs } from "@heroui/react";
import React from "react";
import RoleControl from "./RoleControl";
import ApplicationControl from "./ApplicationControl";
import { useTranslations } from "next-intl";

const AppControl = () => {
  const t = useTranslations("AppControl");
  const [selectedTab, setSelectedTab] = React.useState("rbac");

  return (
    <div className="">
      {/* <div className="p-4">
        <Heading> {t("title")}</Heading>
      </div> */}
      <div className="p-4 ">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(String(key))}
          aria-label="Options"
          variant="underlined"
          className="w-full"
          classNames={{
            tabContent: "group-data-[selected=true]:text-iconcolor ",
            tabList:
              "text-textcolor  rounded-xl font-semibold border dark:border-zinc-800 p-0",
          }}
        >
          <Tab
            key="rbac"
            title={
              selectedTab === "rbac" ? (
                <Subheading>{t("title1")}</Subheading>
              ) : (
                <Subheading>{t("title1")}</Subheading>
              )
            }
          >
            <RoleControl />
          </Tab>
          <Tab
            key="applications"
            title={<Subheading>{t("title2")}</Subheading>}
          >
            <ApplicationControl />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AppControl;
