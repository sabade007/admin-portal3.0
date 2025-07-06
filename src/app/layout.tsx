import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/provider/Provider";
import IntlProvider from "@/provider/IntlProvider";
import { Poppins } from "next/font/google";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";

import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import hi from "../../messages/hi.json";
import kn from "../../messages/kn.json";
import ar from "../../messages/ar.json";
import bn from "../../messages/bn.json";
import de from "../../messages/de.json";
import es from "../../messages/es.json";
import ja from "../../messages/ja.json";
import ml from "../../messages/ml.json";
import pt from "../../messages/pt.json";
import ru from "../../messages/ru.json";
import ta from "../../messages/ta.json";
import te from "../../messages/te.json";
import zhCN from "../../messages/zh-CN.json";

import { env, PublicEnvScript } from "next-runtime-env";
import AppDirectionManager from "./AppDirectionManager";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ttnorms = localFont({
  src: "../assets/fonts/ttnorms.otf",
  variable: "--font-ttnorms",
  weight: "400",
});

export const metadata: Metadata = {
  title:
    env("NEXT_PUBLIC_USE_DEFAULT_LOGO_TAGLINE") === "true"
      ? "Indryve-Workspace"
      : env("NEXT_PUBLIC_BRAND_NAME") || "Indryve-Workspace",
  description:
    env("NEXT_PUBLIC_USE_DEFAULT_LOGO_TAGLINE") === "true"
      ? "Accelerate your Collaboration"
      : env("NEXT_PUBLIC_BRAND_DESC") || "Accelerate your Collaboration",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messagesByLocale = {
    en,
    kn,
    hi,
    fr,
    ar,
    bn,
    de,
    es,
    ja,
    ml,
    pt,
    ru,
    ta,
    te,
    zhCN,
  };

  const rtlLocales = ["ar", "he", "fa", "ur"];

  const locale = await getLocale();
  const isRtl = rtlLocales.includes(locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href={
            env("NEXT_PUBLIC_USE_DEFAULT_LOGO_TAGLINE") === "true"
              ? "/favicon.ico"
              : env("NEXT_PUBLIC_BRAND_FAVICON_URL") || "/favicon.ico"
          }
        />
      </head>

      <body
        className={`${poppins.variable}  ${ttnorms.variable} antialiased font-poppins bg-background text-foreground 
      
      `}
      >
        <PublicEnvScript />
        <IntlProvider messagesByLocale={messagesByLocale}>
          <Provider>
            <AppDirectionManager />
            {children}
          </Provider>
        </IntlProvider>
      </body>
    </html>
  );
}
