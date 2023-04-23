import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { DAppProvider } from "@usedapp/core";
import "@/styles/globals.css";

import { useLang } from "@/hooks";
import { Layout } from "@/modules/layout";
import { WrongNetworkModal } from "@/modules/profile";
import { config } from "@/config";

export default function App({ Component, pageProps }: AppProps) {
  const [locale, messages] = useLang();

  return (
    <DAppProvider config={config.network}>
      <IntlProvider locale={locale} messages={messages}>
        <Layout>
          <Component {...pageProps} />
          <WrongNetworkModal />
        </Layout>
      </IntlProvider>
    </DAppProvider>
  );
}
