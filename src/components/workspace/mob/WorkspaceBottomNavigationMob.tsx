import Paragraph from "@/components/themes/Paragraph";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { Button } from "@heroui/react";
import { Settings, SquircleDashed, TriangleDashed } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const WorkspaceBottomNavigationMob = () => {
  const { currentMobileTab, setCurrentMobileTab } = useWorkspaceStore();
  const t = useTranslations("WorkspaceMobile");

  return (
    <div className="w-full h-[58px] grid grid-cols-3">
      <div
        className={` col-span-1 flex flex-col h-full items-center justify-center }`}
      >
        <Button
          onPress={() => setCurrentMobileTab("suitemob")}
          variant={currentMobileTab === "suitemob" ? "flat" : "light"}
          className="w-full  h-full"
        >
          <div className="flex flex-col items-center">
            <SquircleDashed className="w-5 h-5" />
            <Paragraph>{t("Navigation.suiteapps")}</Paragraph>
          </div>
        </Button>
      </div>
      <div
        className={` col-span-1 flex flex-col h-full items-center justify-center`}
      >
        <Button
          onPress={() => setCurrentMobileTab("myappsmob")}
          variant={currentMobileTab === "myappsmob" ? "flat" : "light"}
          className="w-full h-full"
        >
          <div className="flex flex-col items-center">
            <TriangleDashed className="w-5 h-5" />
            <Paragraph>{t("Navigation.myapps")}</Paragraph>
          </div>
        </Button>
      </div>
      <div
        className={` col-span-1 flex flex-col h-full items-center justify-center `}
      >
        <Button
          onPress={() => setCurrentMobileTab("settingsmob")}
          variant={currentMobileTab === "settingsmob" ? "flat" : "light"}
          className="w-full  h-full"
        >
          <div className="flex flex-col items-center">
            <Settings className="w-5 h-5" />
            <Paragraph>{t("Navigation.settings")}</Paragraph>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceBottomNavigationMob;
