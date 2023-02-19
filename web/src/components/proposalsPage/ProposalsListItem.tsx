import Link from "next/link";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";
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
              <FormattedMessage
                id="proposal.proposedBy"
                values={{ name: proposer }}
              />{" "}
              | <FormattedDate value={date} /> <FormattedTime value={date} />
            </p>
          </div>
          <div className="flex items-center">
            <FormattedMessage id="proposal.state.active" />
          </div>
        </div>
      </div>
    </Link>
  );
};
