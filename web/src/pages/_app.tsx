import { useLang } from "@/hooks/useLang";
import { IntlProvider } from "react-intl";
import { type Config, DAppProvider, Goerli } from "@usedapp/core";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

import { Layout } from "@/components/layout/Layout";
import { WrongNetworkModal } from "@/components/profile/WrongNetworkModal";

export const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
} as const;

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
