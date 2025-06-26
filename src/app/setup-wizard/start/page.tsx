"use client";
import Admin from "@/components/setup/Admin";
import Advanced from "@/components/setup/Advanced";
import Applications from "@/components/setup/Applications";
import Contact from "@/components/setup/Contact";
import Email from "@/components/setup/Email";
import Organization from "@/components/setup/Organization";
import SetupTabItem from "@/components/setup/SetupTabItem";
import SetupTabItemHeader from "@/components/setup/SetupTabItemHeader";
import Button from "@/components/themes/Button";
import Heading from "@/components/themes/Heading";
import Paragraph from "@/components/themes/Paragraph";
import { Particles } from "@/components/themes/Particles";
import Subheading from "@/components/themes/SubHeading";
import FontSizeSelector from "@/components/ux/FontsizeSelector";
import LanguageSwitcher from "@/components/ux/LanguageSwitcher";
import ThemeSwitch from "@/components/ux/ThemeSwitch";
import ThemetypeSelector from "@/components/ux/ThemetypeSelector";
import useCaptchaRedirect from "@/hooks/setup/useCaptchaRedirect";
import useThemeColor from "@/hooks/useThemeColor";
import {
  AdminSvg,
  AdvancedSvg,
  ApplicationsSvg,
  BuildingSvg,
  ContactSvg,
  MailBoxSvg,
  SetupwizardSvg,
} from "@/lib/svg";
import useSetupstore from "@/store/setup/useSetupStore";
import { Divider, Spinner, Tab, Tabs } from "@heroui/react";
import { ArrowBigDownDash } from "lucide-react";
import { useTranslations } from "next-intl";
import { env } from "next-runtime-env";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const mounted = useCaptchaRedirect();

  const color = useThemeColor();
  const { disabledKeys, currentTab, setCurrentTab } = useSetupstore();

  const t = useTranslations("Setup");
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner variant="wave" size="sm" color="default" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen  p-16 flex  justify-center">
      <div className=" flex-1 max-w-7xl sm:hidden md:hidden lg:flex xl:flex flex-col dark:bg-zinc-950   gap-4 rounded-xl shadow-iconcolor/10 shadow-2xl">
        <Tabs
          selectedKey={currentTab}
          onSelectionChange={(key) => setCurrentTab(String(key))}
          disabledKeys={disabledKeys}
          fullWidth
          key="tabs"
          color="default"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b  border-divider",
            cursor: "w-full bg-iconcolor",
          }}
          size="md"
          aria-label="Tabs variants"
          variant="underlined"
          defaultSelectedKey={"apps"}
        >
          <Tab
            key="organization"
            title={t("Tabs.Tab1")}
            className="p-0 max-h-[calc(100vh-200px)] h-full  "
          >
            <SetupTabItem
              child1={
                <SetupTabItemHeader
                  heading={t("Organization.title")}
                  desc={t("Organization.description")}
                  image={<BuildingSvg className="w-60 h-auto" />}
                />
              }
              child2={<Organization />}
            />
          </Tab>
          <Tab
            key="contact"
            title={t("Tabs.Tab2")}
            className="p-0 max-h-[calc(100vh-200px)] h-full  "
          >
            <SetupTabItem
              child1={
                <SetupTabItemHeader
                  heading={t("Contact.title")}
                  desc={t("Contact.description")}
                  image={<ContactSvg className="w-60 h-auto" />}
                />
              }
              child2={<Contact />}
            />
          </Tab>
          <Tab
            key="admin"
            title={t("Tabs.Tab3")}
            className="p-0 max-h-[calc(100vh-200px)] h-full  "
          >
            <SetupTabItem
              child1={
                <SetupTabItemHeader
                  heading={t("Admin.title")}
                  desc={t("Admin.description")}
                  image={<AdminSvg className="w-60 h-auto" />}
                />
              }
              child2={<Admin />}
            />
          </Tab>
          <Tab
            key="smtp"
            title={t("Tabs.Tab4")}
            className="p-0 max-h-[calc(100vh-200px)] h-full  "
          >
            <SetupTabItem
              child1={
                <SetupTabItemHeader
                  heading={t("Email.title")}
                  desc={t("Email.description")}
                  image={<MailBoxSvg className="w-60 h-auto" />}
                />
              }
              child2={<Email />}
            />
          </Tab>
          <Tab
            key="advanced"
            title={t("Tabs.Tab5")}
            className="p-0 max-h-[calc(100vh-200px)] h-full  "
          >
            <SetupTabItem
              child1={
                <SetupTabItemHeader
                  heading={t("Advanced.title")}
                  desc={t("Advanced.description")}
                  image={<AdvancedSvg className="w-60 h-auto" />}
                />
              }
              child2={<Advanced />}
            />
          </Tab>
          <Tab
            key="apps"
            title={t("Tabs.Tab6")}
            className="p-0 max-h-[calc(100vh-200px)] h-full  "
          >
            <SetupTabItem
              child1={
                <SetupTabItemHeader
                  heading={t("Applications.title")}
                  desc={t("Applications.description")}
                  image={<ApplicationsSvg className="w-60 h-auto" />}
                />
              }
              child2={<Applications />}
            />
          </Tab>
        </Tabs>
      </div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
};

export default page;
