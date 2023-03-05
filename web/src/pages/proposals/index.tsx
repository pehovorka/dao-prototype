import { SEO } from "@/components/common/SEO";
import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";

import { ProposalsList } from "@/components/proposals/proposalsPage";
import { Title } from "@/components/ui";

export default function ProposalsPage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <SEO title={formatMessage({ id: "proposals.title" })} />
      <div className="flex gap-8 justify-between items-center">
        <Title>
          <FormattedMessage id="proposals.list.title" />
        </Title>
        <Link href="/proposal/new">
          <button className="btn gap-1 btn-primary mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 18L12 6M6 12l12 0"
              />
            </svg>
            <span className="hidden sm:inline">
              <FormattedMessage id="proposals.list.addNewButton" />
            </span>
          </button>
        </Link>
      </div>
      <ProposalsList />
    </>
  );
}
