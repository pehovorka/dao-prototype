import { useRouter } from "next/router";
import { Alert } from "@/components/ui/Alert";
import { Title } from "@/components/ui/Title";
import { useProposals } from "@/hooks/useProposals";

export default function PropsalDetailPage() {
  const router = useRouter();
  const { proposalId } = router.query;

  const { proposals, error } = useProposals(proposalId);

  if (!proposals)
    return <progress className="progress progress-primary mt-40"></progress>;

  if (error || proposals.length === 0)
    return (
      <Alert message="Proposal with this ID couldn't be found." type="error" />
    );

  return <Title>{proposals[0].data.description}</Title>;
}
