import Subheading from "@/components/themes/SubHeading";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { useTranslations } from "next-intl";
import React from "react";
import { motion } from "framer-motion";
import useThemeColor from "@/hooks/useThemeColor";
import Paragraph from "@/components/themes/Paragraph";
import useFontSizeStore from "@/store/ux/useFontsizeStore";
import useSearchStore from "@/store/workspace/useSearchStore";
import { EmptyApps, Search } from "@/lib/svg";
import Tiny from "@/components/themes/Tiny";
import { addToast } from "@heroui/react";

const MyApps = () => {
  const t = useTranslations("WorkSpace");
  const { applicationArray, currentTab, bookMarks, getAllApplications } =
    useWorkspaceStore();
  const { themeType } = useThemetypeStore();
  const themeColor = useThemeColor();
  const { fontsize } = useFontSizeStore();
  const { searchTerm } = useSearchStore();

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      await getAllApplications(localStorage.getItem("orgId"));
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Get only NON-default apps
  const nonDefaultApps = applicationArray.filter((app: any) => !app.isDefault);

  // Filter apps by search term if we're in the "myapps" tab
  const filteredApps =
    currentTab === "myapps" && searchTerm.length >= 3
      ? nonDefaultApps.filter((app: any) =>
          app.applicationName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : nonDefaultApps;

  const filteredBookmarks =
    currentTab === "myapps" && searchTerm.length >= 3
      ? bookMarks.filter((bookmark: any) =>
          bookmark.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : bookMarks;

  const AppCard = ({
    logo,
    name,
    url,
    themeColor,
  }: {
    logo: string;
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
            ? "w-[130px]"
            : fontsize === "md"
            ? "w-[150px]"
            : "w-[180px]"
        } relative h-auto dark:bg-zinc-800 p-3 gap-2 border-t dark:border-none h-auto shadow-md rounded-2xl group cursor-pointer transition-shadow flex flex-col items-center justify-center`}
        onClick={() => {
          if (url && url.trim().toLowerCase() !== "null" && url.trim() !== "") {
            window.open(url, "_blank");
          } else {
            addToast({
              title: t("MyApps.applicationUrlnotfoundtitle"),
              description: t("MyApps.applicationUrlnotfounddesc"),
            });
          }
        }}
      >
        <motion.div
          variants={lineVariants}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full h-[3px] origin-center rounded"
          style={{ backgroundColor: themeColor }}
        />
        <div className="grid grid-rows-2 gap-2">
          <div className="row-span-1 flex items-center justify-center">
            {typeof logo === "string" && logo.trim() !== "" ? (
              <img src={logo} alt={name} className="w-8 h-8 object-contain" />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
                {name[0]}
              </div>
            )}
          </div>
          <div className="text-center row-span-1 flex items-center">
            <Paragraph>{name}</Paragraph>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 w-full max-h-[calc(100dvh-76px)] overflow-y-auto scrollbar-hide">
      <div className="p-4">
        <Subheading>{t("MyApps.title")}</Subheading>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {filteredApps.map((app) => (
          <AppCard
            key={app.applicationId}
            logo={app.applicationLogo}
            name={app.applicationName}
            url={app.applicationUrl}
            themeColor={themeColor}
          />
        ))}

        {filteredApps.length === 0 && nonDefaultApps.length !== 0 && (
          <div className="w-full h-full flex-col gap-4 flex items-center justify-center text-gray-400 text-sm">
            <Search className="w-24 h-24" />
            <Tiny> {t("MyApps.searchResult")}</Tiny>
          </div>
        )}

        {nonDefaultApps.length === 0 && filteredApps.length === 0 && (
          <div className="w-full h-full flex-col gap-4 flex items-center justify-center text-gray-400 text-sm">
            <EmptyApps className="w-24 h-24" />
            <Tiny> {t("MyApps.noApps")}</Tiny>
          </div>
        )}
      </div>
      <div>
        <div className="p-4">
          <Subheading>{t("MyApps.bookmark")}</Subheading>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {filteredBookmarks.map((app) => (
            <AppCard
              key={app.id}
              logo={app.icon}
              name={app.name}
              url={app.link}
              themeColor={themeColor}
            />
          ))}

          {filteredBookmarks.length === 0 && bookMarks.length !== 0 && (
            <div className="w-full h-full flex-col gap-4 flex items-center justify-center text-gray-400 text-sm">
              <Search className="w-24 h-24" />
              <Tiny> {t("MyApps.noBookmarks")}</Tiny>
            </div>
          )}

          {filteredBookmarks.length === 0 && bookMarks.length === 0 && (
            <div className="w-full h-full flex-col gap-4 flex items-center justify-center text-gray-400 text-sm">
              <EmptyApps className="w-24 h-24" />
              <Tiny> {t("MyApps.noApps")}</Tiny>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApps;
