import Button from "@/components/themes/Button";
import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import FontSizeSelector from "@/components/ux/FontsizeSelector";
import LanguageSwitcher from "@/components/ux/LanguageSwitcher";
import ThemeSwitch from "@/components/ux/ThemeSwitch";
import decryptValues from "@/hooks/decryptValue";
import useLoginStore from "@/store/login/useLoginStore";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import { addToast, Avatar } from "@heroui/react";
import { File, FileText, Headset, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { env } from "next-runtime-env";
import { useRouter } from "next/navigation";
import React from "react";

const WorkspaceSettingsMob = () => {
  const t = useTranslations("WorkspaceMobile.Settings");
  const { displayPicture, emailAddress, fullName, userName } =
    useWorkspaceStore();
  const { handleLogoutsubmit } = useLoginStore();
  const fallbackInitial = fullName?.[0] ?? "?";
  const hasDisplayPicture =
    typeof displayPicture === "string" &&
    displayPicture.trim() !== "" &&
    displayPicture.toLowerCase() !== "null";

  const router = useRouter();

  const handleLogout = async () => {
    const localdata = await decryptValues(["token", "type", "idToken"]);
    if (!localdata) {
      console.error("localdata is null or undefined");
      return;
    }
    try {
      if (localdata.type === "DB_LOGIN") {
        const formdata = {
          expiry: 0,
          jwtToken: localdata.token,
        };

        const response = await handleLogoutsubmit(formdata);
        if (response?.redirectUrl) {
          addToast({
            title: "Logged out successfully",
            color: "success",
          });
          localStorage.clear();
          router.push("/admin/login");
        }
      } else {
        const formdata = {
          expiry: 0,
          jwtToken: localdata.token,
          idToken: localdata.idToken,
        };
        const response = await handleLogoutsubmit(formdata);
        if (response?.redirectUrl) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.replace(response.redirectUrl);
        }
        addToast({
          title: "Logged out successfully",
          color: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4 bg-iconcolor/10 rounded-lg p-4">
        <div className="col-span-1 flex flex-col items-center justify-center">
          {hasDisplayPicture ? (
            <Avatar
              isBordered
              size="sm"
              className="transition-transform"
              src={displayPicture}
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-500">
              {fallbackInitial}
            </div>
          )}
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <Paragraph>{t("signed")}</Paragraph>
          <Subheading>{fullName}</Subheading>
          <Paragraph>{"@" + userName}</Paragraph>
          <Paragraph>{emailAddress}</Paragraph>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Subheading>{t("settings")}</Subheading>

        <LanguageSwitcher isDropdowntype isFullWidth />

        <FontSizeSelector isDropdowntype isFullWidth />
        <ThemeSwitch isDropdowntype isFullWidth />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Subheading>{t("links")}</Subheading>

        <Button
          className="w-full"
          onPress={() =>
            window.open(env("NEXT_PUBLIC_PRIVACY_POLICY_LINK"), "_blank")
          }
        >
          <div className="w-full flex flex-row items-center">
            <FileText className="mr-2 w-4 h-4" />
            {t("privacy")}
          </div>
        </Button>
        <Button
          className="w-full"
          onPress={() =>
            window.open(env("NEXT_PUBLIC_TERMS_OF_USE_LINK"), "_blank")
          }
        >
          <div className="w-full flex flex-row items-center">
            <FileText className="mr-2 w-4 h-4" />
            {t("terms")}
          </div>
        </Button>

        <Button
          className="w-full"
          onPress={() => window.open(env("NEXT_PUBLIC_SUPPORT_LINK"), "_blank")}
        >
          <div className="w-full flex flex-row items-center">
            <Headset className="mr-2 w-4 h-4" />
            {t("support")}
          </div>
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <Subheading>{t("logout")}</Subheading>

        <Button className="w-full" onPress={handleLogout}>
          <div className="w-full flex flex-row items-center">
            <LogOut className="mr-2 w-4 h-4" />
            {t("logout")}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceSettingsMob;
