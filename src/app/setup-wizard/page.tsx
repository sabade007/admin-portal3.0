"use client";
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
import { SetupwizardSvg } from "@/lib/svg";
import useSetupstore from "@/store/setup/useSetupStore";
import { Divider, Spinner } from "@heroui/react";
import { ArrowBigRightDash, ForwardIcon, TextCursorIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { env } from "next-runtime-env";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const color = useThemeColor();
  const t = useTranslations("Setup");
  const mounted = useCaptchaRedirect();

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner variant="wave" size="sm" color="default" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="sm:hidden md:hidden lg:flex xl:flex">
        <div className=" p-16 px-20 max-w-2xl rounded-xl flex flex-col gap-4 shadow-2xl items-center">
          <Heading>{t("title")}</Heading>
          <SetupwizardSvg className="w-48 h-auto" />
          <div>
            <Subheading>{t("welcome")}</Subheading>
            <Paragraph justify="text-justify">{t("description")}</Paragraph>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              onPress={() => router.push("/setup-wizard/start")}
              isIconOnly
              className="rounded-full w-12 h-12"
            >
              <ArrowBigRightDash className="w-8 h-8" />
            </Button>
            <Subheading>{t("next")}</Subheading>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <FontSizeSelector isDropdowntype />
            <ThemeSwitch isDropdowntype />
            <ThemetypeSelector isDropdowntype />
            <LanguageSwitcher isDropdowntype />
          </div>
        </div>
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
