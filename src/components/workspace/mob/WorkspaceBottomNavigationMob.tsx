import Paragraph from "@/components/themes/Paragraph";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { Button } from "@heroui/react";
import {
  LayoutGrid,
  Settings,
  SquircleDashed,
  TriangleDashed,
} from "lucide-react";
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
          radius="full"
          onPress={() => setCurrentMobileTab("suitemob")}
          variant={currentMobileTab === "suitemob" ? "solid" : "light"}
          className={`${
            currentMobileTab === "suitemob" ? "text-buttontext" : ""
          } w-full h-full `}
        >
          <div className="flex flex-col items-center">
            <LayoutGrid className="w-4 h-4" />
            <p className="text-sm font-semibold">{t("Navigation.suiteapps")}</p>
          </div>
        </Button>
      </div>
      <div
        className={` col-span-1 flex flex-col h-full items-center justify-center`}
      >
        <Button
          radius="full"
          onPress={() => setCurrentMobileTab("myappsmob")}
          variant={currentMobileTab === "myappsmob" ? "solid" : "light"}
          className={`${
            currentMobileTab === "myappsmob" ? "text-buttontext" : ""
          } w-full h-full `}
        >
          <div className="flex flex-col items-center">
            <LayoutGrid className="w-4 h-4" />
            <p className="text-sm font-semibold">{t("Navigation.myapps")}</p>
          </div>
        </Button>
      </div>
      <div
        className={` col-span-1 flex flex-col h-full items-center justify-center `}
      >
        <Button
          radius="full"
          onPress={() => setCurrentMobileTab("settingsmob")}
          variant={currentMobileTab === "settingsmob" ? "solid" : "light"}
          className={`${
            currentMobileTab === "settingsmob" ? "text-buttontext" : ""
          } w-full h-full `}
        >
          <div className="flex flex-col items-center">
            <Settings className="w-4 h-4" />
            <p className="text-sm font-semibold">{t("Navigation.settings")}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceBottomNavigationMob;
