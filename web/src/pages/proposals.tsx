import { SEO } from "@/components/layout/SEO";
import { useLogs } from "@usedapp/core";
import { Contract } from "ethers";

import governorContract from "contracts/artifacts/contracts/Governor.sol/HomeOwnersGovernance.json";

const governorContractAddress =
  process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS || "";

const contract = new Contract(governorContractAddress, governorContract.abi);

export default function Proposals() {
  const logs = useLogs<Contract, "ProposalCreated">({
    contract,
    event: "ProposalCreated",
    args: [],
  });

  const proposals = logs?.value?.reverse();
  const error = logs?.error;

  return (
    <>
      <SEO title="Proposals" />
      <h1 className="text-4xl font-black mb-10">List of proposals</h1>
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
          <div
            className="card bg-base-200 shadow-md mb-4 hover:bg-base-300 transition-colors duration-200"
            key={proposal.data.proposalId}
          >
            <div className="card-body flex flex-row justify-between gap-10">
              <div className="min-w-0">
                <h2 className="card-title mt-0">
                  {proposal.data.description.split("\n")[0].slice(2)}
                </h2>
                <p className="mb-0 overflow-ellipsis overflow-hidden">
                  Proposed by {proposal.data.proposer}
                </p>
              </div>
              <div className="flex items-center">Voting in progress...</div>
            </div>
          </div>
        ))
      ) : (
        <progress className="progress progress-primary"></progress>
      )}
    </>
  );
}
