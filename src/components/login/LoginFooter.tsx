import useLoginStore from "@/store/login/useLoginStore";
import { env } from "next-runtime-env";
import React from "react";
import Paragraph from "../themes/Paragraph";
import Tiny from "../themes/Tiny";
import { useTranslations } from "next-intl";

const LoginFooter = () => {
  const { adminVersion } = useLoginStore();
  const t = useTranslations("Login");

  return (
    <div className="w-full h-[80px]">
      <div className="w-full h-full flex flex-col items-center dark:border-zinc-800 border-t justify-center">
        <Paragraph>{t("LoginFooter.copyright")}</Paragraph>
        <div className="w-full flex flex-row items-center justify-center gap-4 pr-2 pl-2">
          <div
            className="hover:cursor-pointer"
            onClick={() =>
              window.open(env("NEXT_PUBLIC_PRIVACY_POLICY_LINK"), "_blank")
            }
          >
            <Tiny>{t("LoginFooter.privacy")}</Tiny>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() =>
              window.open(env("NEXT_PUBLIC_TERMS_OF_USE_LINK"), "_blank")
            }
          >
            <Tiny>{t("LoginFooter.terms")}</Tiny>
          </div>
          <div
            className="hover:cursor-pointer"
            onClick={() =>
              window.open(env("NEXT_PUBLIC_SUPPORT_LINK"), "_blank")
            }
          >
            <Tiny>{t("LoginFooter.support")}</Tiny>
          </div>
          <Tiny>V: {adminVersion}</Tiny>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;
