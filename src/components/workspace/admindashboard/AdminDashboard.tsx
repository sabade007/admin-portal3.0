import Heading from "@/components/themes/Heading";
import { NumberTicker } from "@/components/themes/NumberTicker";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import useDashboardStore from "@/store/workspace/useDashboardStore";
import { Progress } from "@heroui/react";
import { LayoutPanelLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const AdminDashboard = () => {
  const {
    activeUsers,
    totalUsers,
    totalSpaceUsedReadable,
    totalSizeAllocatedReadable,
    spaceConsumedPercent,
    message,
    getConcertUsage,
  } = useDashboardStore();

  const t = useTranslations("AdminDashboard");

  useEffect(() => {
    getConcertUsage();
  }, []);

  return (
    <div className="p-4 w-full max-h-[calc(100dvh-76px)] overflow-y-auto scrollbar-hide">
      <div className="flex flex-wrap">
        <div className="border p-2 rounded-xl flex gap-2 items-center">
          <LayoutPanelLeft className="w-4 h-4" />
          <Subheading>{t("title")}</Subheading>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="col-span-1 flex flex-col gap-4 justify-space-between shadow-md border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
          <Subheading>{t("server")}</Subheading>
          <Progress
            classNames={{
              track: " bg-default/50 ",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
            }}
            formatOptions={{ style: "percent" }}
            label={
              <Paragraph>
                {t("serverUsage")}
                {`${totalSpaceUsedReadable} / ${totalSizeAllocatedReadable}`}
              </Paragraph>
            }
            maxValue={100}
            showValueLabel={true}
            size="sm"
            value={
              isFinite(Number(spaceConsumedPercent))
                ? Number(spaceConsumedPercent)
                : 100 // fallback in case it's "Infinity" or invalid
            }
          />
          {message !== "" || message !== null ? (
            <div className="flex flex-col gap-2 items-center justify-space-between shadow-sm border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
              <Paragraph>{message}</Paragraph>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-space-between shadow-sm border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
              <Paragraph>{t("serverUsageMessage")}</Paragraph>
            </div>
          )}
        </div>
        <div className="col-span-1 h-full">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="col-span-1 flex flex-col gap-2 items-center justify-space-between shadow-md border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
              <NumberTicker
                value={parseFloat(
                  totalSpaceUsedReadable.replace(/[^\d.]/g, "")
                )}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
              <Paragraph>{t("totalSpaceUsed")}</Paragraph>
              <Paragraph>{t("gb")}</Paragraph>
            </div>
            <div className="col-span-1 flex flex-col gap-2 items-center justify-space-between shadow-md border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
              <NumberTicker
                value={parseFloat(
                  totalSizeAllocatedReadable.replace(/[^\d.]/g, "")
                )}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
              <Paragraph>{t("totalSpaceAllocated")}</Paragraph>
              <Paragraph>{t("gb")}</Paragraph>
            </div>
            <div className="col-span-1 flex flex-col gap-2 items-center justify-space-between shadow-md border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
              <NumberTicker
                value={activeUsers}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
              <Paragraph>{t("activeUsers")}</Paragraph>
            </div>
            <div className="col-span-1 flex flex-col gap-2 items-center justify-space-between shadow-md border-t dark:border-none dark:bg-zinc-800 p-4 rounded-xl">
              <NumberTicker
                value={totalUsers}
                className="whitespace-pre-wrap text-2xl font-medium tracking-tighter text-black dark:text-white"
              />
              <Paragraph>{t("totalUsers")}</Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
