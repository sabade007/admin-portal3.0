import Heading from "@/components/themes/Heading";

import { Tab, Tabs } from "@heroui/react";
import { useTranslations } from "next-intl";
import React from "react";
import GeneralSettings from "./GeneralSettings";
import Subheading from "@/components/themes/SubHeading";
import SmtpSettings from "./SmtpSettings";
import Extensions from "./Extensions";
import FileSize from "./FileSize";
import Oauth from "./Oauth";
import Branding from "./Branding";
import MaintenanceSettings from "./MaintenanceSettings";
import { getCookie, setCookie } from "cookies-next";

const AdvancedSettings = () => {
  const t = useTranslations("AdvancedSettings");

  const initialTab = ((): string => {
    const cookieTab = getCookie("advancedSettingsTab");
    return typeof cookieTab === "string" ? cookieTab : "general";
  })();

  const [selectedTab, setSelectedTab] = React.useState<string>(initialTab);

  const handleTabChange = (key: React.Key) => {
    const tabKey = key.toString();
    setSelectedTab(tabKey);
    setCookie("advancedSettingsTab", tabKey, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
  };

  return (
    <div className="">
      <div className="p-4">
        <Heading> {t("title")}</Heading>
      </div>
      <div className="p-4 pt-0">
        <Tabs
          aria-label="Options"
          variant="underlined"
          className="w-full"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
          classNames={{
            tabContent: "group-data-[selected=true]:text-iconcolor ",
            tabList:
              "text-textcolor  rounded-xl font-semibold border dark:border-zinc-800 ",
          }}
        >
          <Tab
            key="general"
            title={<Subheading>{t("registration")}</Subheading>}
          >
            <GeneralSettings />
          </Tab>
          <Tab
            key="maintenance"
            title={<Subheading>{t("maintenance")}</Subheading>}
          >
            <MaintenanceSettings />
          </Tab>
          <Tab key="smtp" title={<Subheading>{t("email")}</Subheading>}>
            <SmtpSettings />
          </Tab>
          <Tab key="ldap" title={<Subheading>{t("ldap")}</Subheading>}>
            {/* <Ldap /> */}
          </Tab>
          <Tab
            key="extensions"
            title={<Subheading>{t("extensions")}</Subheading>}
          >
            <Extensions />
          </Tab>
          <Tab key="file" title={<Subheading>{t("filesize")}</Subheading>}>
            <FileSize />
          </Tab>
          <Tab key="oauth" title={<Subheading>{t("oauth")}</Subheading>}>
            <Oauth />
          </Tab>
          <Tab key="brand" title={<Subheading>{t("branding")}</Subheading>}>
            <Branding />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedSettings;
