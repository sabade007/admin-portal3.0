import Paragraph from "@/components/themes/Paragraph";
import Subheading from "@/components/themes/SubHeading";
import Tiny from "@/components/themes/Tiny";
import decryptValues from "@/hooks/decryptValue";
import useThemeColor from "@/hooks/useThemeColor";
import useLoginStore from "@/store/login/useLoginStore";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import useWorkspaceStore from "@/store/workspace/useWorkspaceStore";
import {
  addToast,
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import { env } from "next-runtime-env";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const t = useTranslations("WorkSpace");
  const { themeType } = useThemetypeStore();
  const color = useThemeColor();

  const { displayPicture, emailAddress, fullName, userName } =
    useWorkspaceStore();

  const { handleLogoutsubmit } = useLoginStore();
  const router = useRouter();

  const handleLogout = async () => {
    const localdata = await decryptValues([
      "email",
      "username",
      "token",
      "type",
      "idToken",
    ]);
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
    <Dropdown size="sm" placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          size="sm"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant={
          themeType === "dense"
            ? "solid"
            : themeType === "outlined"
            ? "bordered"
            : "flat"
        }
      >
        <DropdownItem key="profile" className=" gap-2">
          <Paragraph>{t("Profile.signed")}</Paragraph>
          <Subheading>{fullName}</Subheading>
          <Tiny>{"@ " + userName}</Tiny>
          <Tiny>{emailAddress}</Tiny>
          <Divider className="mt-2" />
        </DropdownItem>

        <DropdownItem
          key="privacy"
          onClick={() =>
            window.open(env("NEXT_PUBLIC_PRIVACY_POLICY_LINK"), "_blank")
          }
        >
          {t("Profile.privacy")}
        </DropdownItem>
        <DropdownItem
          key="terms"
          onClick={() =>
            window.open(env("NEXT_PUBLIC_TERMS_OF_USE_LINK"), "_blank")
          }
        >
          {t("Profile.terms")}
        </DropdownItem>
        <DropdownItem
          key="support"
          onClick={() => window.open(env("NEXT_PUBLIC_SUPPORT_LINK"), "_blank")}
        >
          {t("Profile.support")}
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onPress={handleLogout}>
          {t("Profile.logout")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Profile;
