import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { shortenAddress } from "@usedapp/core";
import { ProposalCreatedEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

import { BlockDate } from "@/components/common";
import { useProposalState } from "@/hooks";
import { ProposalStateBadge } from "../common";

interface ProposalsListItemProps {
  name: string;
  proposer: string;
  blockNumber: number;
  id: ProposalCreatedEventObject["proposalId"];
}

export const ProposalsListItem = ({
  name,
  proposer,
  blockNumber,
  id,
}: ProposalsListItemProps) => {
  const { state, error } = useProposalState(id);

  return (
    <Link href={`/proposals/${id}`}>
      <div className="card bg-base-200 shadow-md mb-4 hover:bg-base-300 transition-colors duration-200">
        <div className="card-body flex flex-row justify-between gap-10">
          <div className="min-w-0">
            <h2 className="card-title mt-0">{name}</h2>
            <p className="mb-0 overflow-ellipsis overflow-hidden">
              <FormattedMessage
                id="proposal.proposedBy"
                values={{ name: shortenAddress(proposer) }}
              />
              {" | "}
              <BlockDate blockNumber={blockNumber} />
            </p>
          </div>
          <div className="flex items-center">
            {state ? <ProposalStateBadge state={state} /> : "..."}
          </div>
        </div>
      </div>
    </Link>
  );
};
