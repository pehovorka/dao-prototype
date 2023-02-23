import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { useIntl, FormattedMessage } from "react-intl";

import { Alert } from "@/components/ui/Alert";
import { Title } from "@/components/ui/Title";
import { useProposals } from "@/hooks/useProposals";
import { parseProposalDescription } from "@/utils/parseProposalDescription";
import { SEO } from "@/components/common/SEO";
import { Timeline } from "@/components/proposalDetailPage/timeline/Timeline";
import { VotingContainer } from "@/components/proposalDetailPage/voting/VotingContainer";

export default function PropsalDetailPage() {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { proposalId: proposalIdString } = router.query;

  const { proposals, error } = useProposals(proposalIdString);

  if (error || (proposals && proposals.length === 0)) {
    const message = formatMessage({ id: "proposal.notFound" });
    return (
      <>
        <SEO title={message} />
        <Alert message={message} type="error" />
      </>
    );
  }

  if (proposals === undefined)
    return (
      <>
        <SEO />
        <progress className="progress progress-primary mt-5"></progress>
      </>
    );

  const proposal = proposals[0];
  const proposalId = proposal.data.proposalId;

  const { title, body } = parseProposalDescription(proposal.data.description);

  return (
    <>
      <SEO title={title} />
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/proposals">
              <FormattedMessage id="proposals.list.title" />
            </Link>
          </li>
          <li>
            {" "}
            <FormattedMessage id="proposal.title" />
          </li>
        </ul>
      </div>
      <Title>{title}</Title>
      <VotingContainer proposalId={proposalId} />
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
        <Timeline
          proposalId={proposalId}
          createdAtBlock={proposal.blockNumber}
          endsAtBlock={proposal.data.endBlock.toNumber()}
        />
      </div>
    </>
  );
}
