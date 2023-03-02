import { useProposals } from "@/hooks";
import { ProposalsListItem } from "./ProposalsListItem";

export const ProposalsList = () => {
  const { proposals, error } = useProposals();

  return (
    <>
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              There was an error while fetching the proposals. Please try again
              later.
            </span>
          </div>
        </div>
      )}
      {proposals ? (
        proposals.map((proposal) => (
          <ProposalsListItem
            name={proposal.data.description.split("\n")[0].slice(2)}
            proposer={proposal.data.proposer}
            blockNumber={proposal.blockNumber}
            key={proposal.transactionIndex}
            id={proposal.data.proposalId}
          />
        ))
      ) : (
        <progress className="progress progress-primary"></progress>
      )}
    </>
  );
};
