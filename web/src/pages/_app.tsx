import { Layout } from "@/components/layout/Layout";
import "@/styles/globals.css";
import { type Config, DAppProvider, Goerli } from "@usedapp/core";
import type { AppProps } from "next/app";

export const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DAppProvider>
  );
}
