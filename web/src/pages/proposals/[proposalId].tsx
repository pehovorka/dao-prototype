import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { Alert } from "@/components/ui/Alert";
import { Title } from "@/components/ui/Title";
import { useProposals } from "@/hooks/useProposals";
import { parseProposalDescription } from "@/utils/parseProposalDescription";

export default function PropsalDetailPage() {
  const router = useRouter();
  const { proposalId } = router.query;

  const { proposals, error } = useProposals(proposalId);

  if (!proposals)
    return <progress className="progress progress-primary mt-5"></progress>;

  if (error || proposals.length === 0)
    return (
      <Alert message="Proposal with this ID couldn't be found." type="error" />
    );

  const { title, body } = parseProposalDescription(
    proposals[0].data.description
  );

  return (
    <>
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
