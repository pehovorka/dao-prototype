import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { BigNumber } from "ethers";
import { useIntl } from "react-intl";

import { Alert } from "@/components/ui/Alert";
import { Title } from "@/components/ui/Title";
import { useProposals } from "@/hooks/useProposals";
import { parseProposalDescription } from "@/utils/parseProposalDescription";
import { SEO } from "@/components/common/SEO";
import { Timeline } from "@/components/proposalDetailPage/Timeline";

export default function PropsalDetailPage() {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { proposalId } = router.query;

  const { proposals, error } = useProposals(proposalId);

  if (error || (proposals && proposals.length === 0)) {
    const message = formatMessage({ id: "proposal.notFound" });
    return (
      <>
        <SEO title={message} />
        <Alert message={message} type="error" />
      </>
    );
  }

  if (!proposals)
    return <progress className="progress progress-primary mt-5"></progress>;

  const proposal = proposals[0];

  const { title, body } = parseProposalDescription(proposal.data.description);

  return (
    <>
      <SEO title={title} />
      <Title>{title}</Title>
      <Timeline
        proposalId={BigNumber.from(proposalId)}
        createdAtBlock={proposal.blockNumber}
        endsAtBlock={proposal.data.endBlock.toNumber()}
      />
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
    </>
  );
}
