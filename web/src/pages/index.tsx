import { SEO } from "@/components/layout/SEO";
import { FormattedMessage } from "react-intl";

export default function Home() {
  return (
    <>
      <SEO />
      <div className="hero bg-base-200 py-20 px-10 rounded-2xl">
        <div className="hero-content">
          <div>
            <h1 className="text-5xl font-bold">
              <FormattedMessage id="homepage.hero.title" />
            </h1>
            <p className="py-6">
              <FormattedMessage id="homepage.hero.subtitle" />
            </p>
            <button className="btn btn-primary">
              <FormattedMessage id="homepage.hero.cta" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
