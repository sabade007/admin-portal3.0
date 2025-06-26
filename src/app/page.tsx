"use client";
import SplashScreen from "@/components/splash/SplashScreen";
import { Particles } from "@/components/themes/Particles";
import FontSizeSelector from "@/components/ux/FontsizeSelector";
import LanguageSwitcher from "@/components/ux/LanguageSwitcher";
import ThemeSwitch from "@/components/ux/ThemeSwitch";

import { useTranslations } from "next-intl";
import { env } from "next-runtime-env";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSetupStore from "@/store/setup/useSetupStore";
import useThemeColor from "@/hooks/useThemeColor";

export default function Home() {
  const { getCaptcha } = useSetupStore();

  const [animationComplete, setAnimationComplete] = useState(false);

  const router = useRouter();
  const color = useThemeColor();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getCaptcha();

      if (response.responseCode === 200) {
        if (env("NEXT_PUBLIC_USE_DEFAULT_ENDORSE_LOGIN") === "true") {
          const oauthUrl = env("NEXT_PUBLIC_OAUTH_URL");
          const redirecturl = env("NEXT_PUBLIC_OAUTH_REDIRECT_URL");

          window.location.href = `${oauthUrl}?redirect_uri=${redirecturl}`;
        } else {
          router.push("/admin/login");
        }
      } else if (response.responseCode === 204) {
        router.push("/setup-wizard");
      } else {
        return;
      }
    };

    if (animationComplete) {
      fetchdata();
    }
  }, [animationComplete]);

  return (
    <div>
      <SplashScreen onAnimationComplete={() => setAnimationComplete(true)} />
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
