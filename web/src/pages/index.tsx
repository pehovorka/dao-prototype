import Link from "next/link";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

import { SEO } from "@/modules/common/SEO";
import { WarningIcon } from "@/modules/ui";

export default function Home() {
  return (
    <>
      <SEO />
      <div>
        <section className="hero bg-base-100 rounded-2xl px-4 md:px-12">
          <div className="hero-content py-12 grid gap-4 gap-y-16 md:grid-cols-threeFifths">
            <div className="md:py-20">
              <h1 className="text-4xl font-semibold mb-16 lg:text-5xl">
                <FormattedMessage id="homepage.hero.title" />
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  <FormattedMessage id="homepage.hero.title.highlighted" />
                </span>
              </h1>
              <p className="mb-16 lg:w-4/5 text-lg">
                <FormattedMessage id="homepage.hero.subtitle" />
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href={"/proposals"}
                  className="btn btn-primary bg-gradient-to-r from-primary to-fuchsia-700 border-none transition-all hover:hue-rotate-15"
                >
                  <FormattedMessage id="homepage.hero.cta.showProposals" />
                </Link>
                <Link
                  href={"/proposal/new"}
                  className="btn btn-secondary btn-outline"
                >
                  <FormattedMessage id="homepage.hero.cta.createProposal" />
                </Link>
              </div>
            </div>
            <div>
              <Image
                src={"/images/hero_illustration.png"}
                width={700}
                height={700}
                alt=""
              />
            </div>
          </div>
        </section>
        <section className="alert flex-row items-center md:justify-center gap-4 mt-8 opacity-75">
          <WarningIcon className="w-8 h-8 min-w-fit stroke-warning" />
          <FormattedMessage id="homepage.hero.disclaimer" />
        </section>
      </div>
    </>
  );
}
