import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
import { type Config, DAppProvider, Goerli } from "@usedapp/core";
import "@/styles/globals.css";

import { useLang } from "@/hooks";
import { Layout } from "@/modules/layout";
import { WrongNetworkModal } from "@/modules/profile";

export const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [locale, messages] = useLang();

  return (
    <DAppProvider config={config}>
      <IntlProvider locale={locale} messages={messages}>
        <Layout>
          <Component {...pageProps} />
          <WrongNetworkModal />
        </Layout>
      </IntlProvider>
    </DAppProvider>
  );
}
