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

import { env, PublicEnvScript } from "next-runtime-env";

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
      ? "Indryve-Portal"
      : env("NEXT_PUBLIC_BRAND_NAME") || "Indryve-Portal",
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
  const messagesByLocale = { en, kn };

  // const locale = await getLocale();

  return (
    <html>
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
          <Provider>{children}</Provider>
        </IntlProvider>
      </body>
    </html>
  );
}
