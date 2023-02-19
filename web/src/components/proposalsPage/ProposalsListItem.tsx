import Link from "next/link";
import { useBlock } from "@/hooks/useBlock";
import { ProposalCreatedEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

interface ProposalsListItemProps {
  name: string;
  proposer: string;
  blockNumber: number;
  id: ProposalCreatedEventObject["proposalId"];
}

const getDate = (timestamp: number | undefined) => {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};

export const ProposalsListItem = ({
  name,
  proposer,
  blockNumber,
  id,
}: ProposalsListItemProps) => {
  const block = useBlock(blockNumber);

  const date = getDate(block?.timestamp);

  return (
    <Link href={`/proposals/${id}`}>
      <div className="card bg-base-200 shadow-md mb-4 hover:bg-base-300 transition-colors duration-200">
        <div className="card-body flex flex-row justify-between gap-10">
          <div className="min-w-0">
            <h2 className="card-title mt-0">{name}</h2>
            <p className="mb-0 overflow-ellipsis overflow-hidden">
              Proposed by {proposer} | {date}
            </p>
          </div>
          <div className="flex items-center">Voting in progress...</div>
        </div>
      </div>
    </Link>
  );
};
