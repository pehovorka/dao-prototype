import Head from "next/head";

interface SEOProps {
  title: string;
}
export const SEO = ({ title }: SEOProps) => {
  const titleWithSuffix = title
    ? `${title} | Homeowners DAO`
    : "Homeowners DAO";
  return (
    <Head>
      <title>{titleWithSuffix}</title>
    </Head>
  );
};
