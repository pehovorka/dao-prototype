import Head from "next/head";
import { useIntl } from "react-intl";

interface SEOProps {
  title?: string;
}
export const SEO = ({ title }: SEOProps) => {
  const { formatMessage } = useIntl();
  const pageName = formatMessage({ id: "site.name" });

  const titleWithSuffix = title ? `${title} | ${pageName}` : pageName;
  return (
    <Head>
      <title>{titleWithSuffix}</title>
    </Head>
  );
};
