import darkerlogo from "@/assets/dark/darklogo.png";
import lightlogo from "@/assets/light/lightlogo.png";
import { env } from "next-runtime-env";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import darkgif from "@/assets/dark/darkgif.gif";
import lightgif from "@/assets/light/lightgif.gif";
import useSplashAnimationComplete from "@/hooks/splashAnimation";
import useThemetypeStore from "@/store/ux/useThemetypeStore";
import { Spinner } from "@heroui/react";
import { useTranslations } from "next-intl";
import Heading from "../themes/Heading";
import ThemeSwitch from "../ux/ThemeSwitch";

type SplashScreenProps = {
  onAnimationComplete: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [useDefault, setUseDefault] = useState(
    env("NEXT_PUBLIC_USE_DEFAULT_LOGO_TAGLINE") === "true" ? true : false
  );

  const t = useTranslations("SplashScreen");

  ////////All below are for Brands only
  const [logo, setLogo] = useState("");
  const [darklogo, setDarkLogo] = useState("");
  const [tagline, setTagline] = useState("");

  const gifDuration = 4000;
  const splashAnimcomplete = useSplashAnimationComplete(gifDuration);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!useDefault) {
      const lightlogo = env("NEXT_PUBLIC_BRAND_LOGO_URL") || "";
      setLogo(lightlogo);

      const darklogor = env("NEXT_PUBLIC_BRAND_LOGO_DARK_URL") || "";
      setDarkLogo(darklogor);

      const tagliner = env("NEXT_PUBLIC_BRAND_LOGO_TAGLINE") || "";
      setTagline(tagliner);
    }

    setMounted(true);
  };

  const { themeType } = useThemetypeStore();

  useEffect(() => {
    if (splashAnimcomplete) {
      onAnimationComplete();
    }
  }, [splashAnimcomplete]);

  if (!mounted) return null;

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center">
      {useDefault ? (
        <div className="flex flex-col items-center gap-2">
          <img
            src={theme === "dark" ? darkgif.src : lightgif.src}
            alt="logo"
            className="w-32 h-auto object-contain"
            style={{
              border: "none none none none",
              clipPath: "inset(2px)",
              display: splashAnimcomplete ? "none" : "block",
            }}
          />
          <img
            src={theme === "dark" ? darkerlogo.src : lightlogo.src}
            alt="logo"
            className="w-32 h-auto object-contain"
            style={{
              display: splashAnimcomplete ? "block" : "none",
            }}
          />
          <div className="flex flex-row items-center gap-2">
            <Heading className="font-ttnorms text-secondary dark:text-white">
              {t("taglineFirstHalf")}
            </Heading>
            <Heading className="font-ttnorms text-primary">
              {t("taglineLastHalf")}
            </Heading>
          </div>
          <Spinner variant="wave" size="sm" color="default" />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {theme === "dark" ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={darklogo === "" ? darkerlogo.src : darklogo}
                alt="logo"
                className="w-32 h-auto object-contain"
              />
              <Heading className="text-white">{tagline}</Heading>
              <ThemeSwitch />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <img
                src={logo === "" ? lightlogo.src : logo}
                alt="logo"
                className="w-32 h-auto object-contain"
              />
              <Heading>{tagline}</Heading>
              <ThemeSwitch />
            </div>
          )}

          <Spinner variant="wave" size="sm" color="default" />
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
