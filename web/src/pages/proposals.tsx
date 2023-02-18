import { SEO } from "@/components/layout/SEO";
import { ProposalsList } from "@/components/proposalsPage/ProposalsList";

export default function Proposals() {
  return (
    <>
      <SEO title="Proposals" />
      <h1 className="text-4xl font-black mb-10">List of proposals</h1>
      <ProposalsList />
    </>
  );
}
