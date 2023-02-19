import { useMemo } from "react";
import { useRouter } from "next/router";
import type { MessageFormatElement } from "react-intl";

import { cs, en } from "@/translations";
import type { MessageKey } from "@/translations";

export const Languages = {
  CS: "cs",
  EN: "en",
} as const;

export const useLang = (): [
  string,
  Record<MessageKey, string> | Record<MessageKey, MessageFormatElement[]>
] => {
  const { locale } = useRouter();

  const shortLocale = locale ?? Languages.CS;

  const messages = useMemo(() => {
    switch (shortLocale) {
      case Languages.CS:
        return cs;
      case Languages.EN:
        return en;
      default:
        return cs;
    }
  }, [shortLocale]);

  return [shortLocale, messages];
};
