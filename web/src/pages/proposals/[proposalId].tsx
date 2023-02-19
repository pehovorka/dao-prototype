import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { Alert } from "@/components/ui/Alert";
import { Title } from "@/components/ui/Title";
import { useProposals } from "@/hooks/useProposals";
import { parseProposalDescription } from "@/utils/parseProposalDescription";
import { SEO } from "@/components/layout/SEO";
import { useIntl } from "react-intl";

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

  const { title, body } = parseProposalDescription(
    proposals[0].data.description
  );

  return (
    <>
      <SEO title={title} />
      <Title>{title}</Title>
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
