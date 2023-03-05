import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { shortenAddress } from "@usedapp/core";
import Blockies from "react-blockies";
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
      <div className="card group shadow-md bg-base-100 mb-3 transition-all duration-200 hover:shadow-xl">
        <div className="card-body flex flex-row justify-between gap-10">
          <div className="min-w-0">
            <h2 className="card-title mt-0 underline decoration-transparent underline-offset-4 decoration-2 transition-colors group-hover:decoration-secondary">
              {name}
            </h2>
            <div className="flex gap-2 items-center mt-3">
              <div className="w-6 h-6 mask mask-squircle">
                <Blockies seed={proposer} size={10} scale={2.4} />
              </div>

              <p className="mb-0 overflow-ellipsis overflow-hidden">
                <FormattedMessage
                  id="proposal.proposedBy"
                  values={{ name: shortenAddress(proposer) }}
                />
                {" | "}
                <BlockDate blockNumber={blockNumber} />
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {state ? <ProposalStateBadge state={state} /> : "..."}
          </div>
        </div>
      </div>
    </Link>
  );
};
