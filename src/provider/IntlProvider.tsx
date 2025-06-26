// components/IntlProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import useLocaleStore from "@/store/ux/useLocaleStore";

type Props = {
  children: React.ReactNode;
  messagesByLocale: Record<string, any>;
};

export default function IntlProvider({ children, messagesByLocale }: Props) {
  const { locale } = useLocaleStore();
  const [messages, setMessages] = useState(messagesByLocale[locale]);

  useEffect(() => {
    setMessages(messagesByLocale[locale]);
  }, [locale, messagesByLocale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
