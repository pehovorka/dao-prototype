import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useIntl } from "react-intl";
import { useAtom } from "jotai";

import {
  Alert,
  Title,
  Skeleton,
  Breadcrumbs,
  type BreadcrumbsItem,
} from "@/modules/ui";

import { useProposalCreatedEvents } from "@/hooks";
import { SEO } from "@/modules/common";
import { parseProposalDescription } from "@/utils";
import { Timeline } from "@/modules/proposals/proposalDetailPage/timeline";
import { VotingContainer } from "@/modules/proposals/proposalDetailPage/voting";
import { proposalDetailAtom } from "@/atoms";
import { ProposalDetailMetaContainer } from "@/modules/proposals/proposalDetailPage/meta";

export default function PropsalDetailPage() {
  const router = useRouter();
  const { formatMessage } = useIntl();

  const proposalIdQuery = router.query.proposalId;

  const { proposals, error } = useProposalCreatedEvents(proposalIdQuery);
  const [proposal, setProposal] = useAtom(proposalDetailAtom);

  useEffect(() => {
    if (proposals && proposals.length > 0) {
      setProposal(proposals[0]);
    }
  }, [proposals, setProposal]);

  if (error || (proposals && proposals.length === 0)) {
    const message = formatMessage({ id: "proposal.notFound" });
    return (
      <>
        <SEO title={message} />
        <Alert message={message} type="error" />
      </>
    );
  }

  if (proposals === undefined || proposal === null)
    return (
      <>
        <SEO />
        <Breadcrumbs items={breadcrumbsItems} />
        <Skeleton type="TITLE" />
        <Skeleton type="TITLE" />
        <Skeleton type="TEXT" />
      </>
    );

  const { title, body } =
    (proposal && parseProposalDescription(proposal.data.description)) || {};

  return (
    <>
      <SEO title={title} />
      <Breadcrumbs items={breadcrumbsItems} />
      <Title className="text-4xl font-black mb-7">{title}</Title>
      <ProposalDetailMetaContainer />
      <VotingContainer />
      <div className="grid sm:grid-cols-twoThirds gap-10">
        <ReactMarkdown
          className="prose"
          components={{
            h1: "h2",
            h2: "h3",
            h3: "h4",
          }}
        >
          {body}
        </ReactMarkdown>

        <Timeline />
      </div>
    </>
  );
}

const breadcrumbsItems: BreadcrumbsItem[] = [
  {
    message: "proposals.list.title",
    href: "/proposals",
  },
  {
    message: "proposal.title",
  },
];
