import Subheading from "@/components/themes/SubHeading";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useThemeColor from "@/hooks/useThemeColor";
import Paragraph from "@/components/themes/Paragraph";
import useFontSizeStore from "@/store/ux/useFontsizeStore";
import { env } from "next-runtime-env";
import dryve from "@/assets/light/dryve.svg";
import converse from "@/assets/light/converse.svg";
import mail from "@/assets/light/mail.svg";
import meet from "@/assets/light/meet.svg";
import videos from "@/assets/light/videos.svg";
import useSearchStore from "@/store/workspace/useSearchStore";
import { EmptyApps, Search } from "@/lib/svg";
import Tiny from "@/components/themes/Tiny";
import { addToast } from "@heroui/react";
import Heading from "@/components/themes/Heading";
import { LayoutGrid } from "lucide-react";

const SuiteApps = () => {
  const t = useTranslations("WorkSpace");
  const { applicationArray } = useWorkspaceStore();
  const { themeType } = useThemetypeStore();
  const defaultApps = applicationArray.filter((app: any) => app.isDefault);
  const themeColor = useThemeColor();
  const { fontsize } = useFontSizeStore();

  const { currentTab, getAllApplications } = useWorkspaceStore();
  const { searchTerm } = useSearchStore();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      await getAllApplications(localStorage.getItem("orgId"));
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const filteredApps =
    currentTab === "suite" && searchTerm.length >= 3
      ? defaultApps.filter((app: any) =>
          app.applicationName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : defaultApps;

  const defaultAppNames = [
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_APPLICATION_NAME"),
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_MAIL_NAME"),
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_CHAT_NAME"),
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_MEET_NAME"),
    env("NEXT_PUBLIC_DEFAULT_INDRYVE_VIDEOS_NAME"),
  ];

  const AppCard = ({
    name,
    url,
    themeColor,
  }: {
    name: string;
    url?: string;
    themeColor: string;
  }) => {
    const lineVariants = {
      initial: { scaleX: 0, opacity: 0 },
      hover: { scaleX: 0.8, opacity: 1 },
    };

    return (
      <motion.div
        whileHover="hover"
        initial="initial"
        className={`${
          fontsize === "sm"
            ? "w-[116px]"
            : fontsize === "md"
            ? "w-[150px]"
            : "w-[180px]"
        } relative dark:bg-zinc-800 h-auto p-2 gap-2 shadow-md  border dark:border dark:border-zinc-800 rounded-xl  group cursor-pointer  transition-shadow flex flex-col items-center justify-center`}
        onClick={() => {
          if (url && url.trim().toLowerCase() !== "null" && url.trim() !== "") {
            window.open(url, "_blank");
          } else {
            addToast({
              title: t("SuiteApps.applicationUrlnotfoundtitle"),
              description: t("SuiteApps.applicationUrlnotfounddesc"),
            });
          }
        }}
      >
        {/* ✅ Animated horizontal line from center */}
        <motion.div
          variants={lineVariants}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full h-[3px] origin-center rounded"
          style={{ backgroundColor: themeColor }}
        />
        {/* Logo */}

        <div className="row-span-1">
          {name === defaultAppNames[0] && (
            <img src={dryve.src} alt="Dryve" className="w-8 h-8" />
          )}
          {name === defaultAppNames[1] && (
            <img src={mail.src} alt="Dryve" className="w-8 h-8" />
          )}
          {name === defaultAppNames[2] && (
            <img src={converse.src} alt="Dryve" className="w-8 h-8" />
          )}
          {name === defaultAppNames[3] && (
            <img src={meet.src} alt="Dryve" className="w-8 h-8" />
          )}
          {name === defaultAppNames[4] && (
            <img src={videos.src} alt="Dryve" className="w-8 h-8" />
          )}
        </div>

        {/* Name */}
        <div className="text-center row-span-1">
          <Paragraph> {name}</Paragraph>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 w-full max-h-[calc(100dvh-76px)] overflow-y-auto scrollbar-hide">
      <div className="flex flex-wrap">
        <div className="border p-2 rounded-xl flex gap-2 items-center">
          <LayoutGrid className="w-4 h-4" />
          <Subheading>{t("SuiteApps.title")}</Subheading>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-2">
        {filteredApps.map((app) => (
          <AppCard
            key={app.applicationId}
            name={app.applicationName}
            url={app.applicationUrl}
            themeColor={themeColor}
          />
        ))}
        {filteredApps.length === 0 && (
          <div className="w-full h-full flex-col gap-4 flex items-center justify-center text-gray-400 text-sm">
            <Search className="w-24 h-24" />
            <Tiny> {t("SuiteApps.searchResult")}</Tiny>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuiteApps;
