import Link from "next/link";
import { SEO } from "@/modules/common/SEO";
import { FormattedMessage } from "react-intl";

export default function Home() {
  return (
    <>
      <SEO />
      <div className="hero bg-base-100 p-5 rounded-2xl lg:py-20">
        <div className="hero-content">
          <div>
            <h1 className="text-4xl font-bold mb-5 lg:text-5xl">
              <FormattedMessage id="homepage.hero.title" />
            </h1>
            <p className="py-6 mb-6 lg:w-3/5 text-lg">
              <FormattedMessage id="homepage.hero.subtitle" />
            </p>
            <Link href={"/proposals"}>
              <button className="btn btn-primary">
                <FormattedMessage id="homepage.hero.cta" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
