import Head from "next/head";

interface SEOProps {
  title: string;
}
export const SEO = ({ title }: SEOProps) => {
  return (
    <Head>
      <title>{title} | Homeowners DAO</title>
    </Head>
  );
};
