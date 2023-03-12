import { useEffect } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useAtom } from "jotai";

import {
  Alert,
  Title,
  Skeleton,
  Breadcrumbs,
  type BreadcrumbsItem,
} from "@/modules/ui";

import { useProposalCreatedEvents } from "@/modules/proposals/hooks";
import { SEO } from "@/modules/common";
import { parseProposalDescription } from "@/utils";
import { VotingContainer } from "@/modules/proposals/proposalDetailPage/voting/votingContainer";
import { proposalDetailAtom } from "@/atoms";
import { ProposalDetailMetaContainer } from "@/modules/proposals/proposalDetailPage/meta";
import { ProposalDetailContentContainer } from "@/modules/proposals/proposalDetailPage/proposalDetailContent";
import { VotesTreeMap } from "@/modules/proposals/proposalDetailPage/voting/treeMap";

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
      <ProposalDetailContentContainer description={body} />
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
