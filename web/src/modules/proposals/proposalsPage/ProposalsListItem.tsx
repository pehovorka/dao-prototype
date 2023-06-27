import Link from "next/link";
import { useEthers } from "@usedapp/core";
import { ProposalCreatedEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

import { AddressWithAvatar, BlockDate } from "@/modules/common";
import { useProposalState } from "@/modules/proposals/hooks";
import { HasActionBadge, HasVotedBadge, ProposalStateBadge } from "../common";

interface ProposalsListItemProps {
  name: string;
  proposer: string;
  blockNumber: number;
  id: ProposalCreatedEventObject["proposalId"];
  hasAction: boolean;
}

export const ProposalsListItem = ({
  name,
  proposer,
  blockNumber,
  id,
  hasAction,
}: ProposalsListItemProps) => {
  const { state } = useProposalState(id);
  const { account } = useEthers();

  return (
    <Link
      href={{
        pathname: "/proposal/[proposalId]",
        query: { proposalId: id.toString() },
      }}
      prefetch={false}
    >
      <div className="card group shadow-md bg-base-100 mb-3 transition-all duration-200 hover:shadow-xl">
        <div className="card-body flex flex-row justify-between gap-5 flex-wrap">
          <div className="min-w-0">
            <div className="flex gap-4 items-center">
              <h2 className="card-title mt-0 underline decoration-transparent underline-offset-4 decoration-2 transition-all group-hover:text-secondary">
                {name}
              </h2>
              {account && <HasVotedBadge type="list" proposalId={id} />}
            </div>
            <div className="flex flex-wrap gap-2 items-center mt-3">
              <AddressWithAvatar address={proposer} short />
              {"|"}
              <div>
                <BlockDate blockNumber={blockNumber} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2 flex-wrap md:justify-end">
            {hasAction && <HasActionBadge />}
            {state ? <ProposalStateBadge state={state} /> : "..."}
          </div>
        </div>
      </div>
    </Link>
  );
};
