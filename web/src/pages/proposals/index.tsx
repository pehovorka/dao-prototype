import { SEO } from "@/components/layout/SEO";
import { ProposalsList } from "@/components/proposalsPage/ProposalsList";
import { Title } from "@/components/ui/Title";

export default function ProposalsPage() {
  return (
    <>
      <SEO title="Proposals" />
      <Title>List of proposals</Title>
      <ProposalsList />
    </>
  );
}
