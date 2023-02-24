import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useCall } from "@usedapp/core";
import { ProposalCreatedEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";
import { BlockDate } from "../common/BlockDate";
import { governorContract } from "@/utils/governorContract";
import { ProposalState } from "@/consts/ProposalState";

interface ProposalsListItemProps {
  name: string;
  proposer: string;
  blockNumber: number;
  id: ProposalCreatedEventObject["proposalId"];
}

type ProposalStateIntlId = `proposal.state.${(typeof ProposalState)[number]}`;
const getProposalStateIntlId = (
  state: number | undefined
): ProposalStateIntlId | undefined => {
  if (state === undefined) return;
  return `proposal.state.${ProposalState[state]}`;
};

export const ProposalsListItem = ({
  name,
  proposer,
  blockNumber,
  id,
}: ProposalsListItemProps) => {
  const stateResult = useCall({
    contract: governorContract,
    method: "state",
    args: [id],
  });

  const proposalState = getProposalStateIntlId(stateResult?.value?.[0]);

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
              />
              {" | "}
              <BlockDate blockNumber={blockNumber} />
            </p>
          </div>
          <div className="flex items-center">
            {proposalState ? <FormattedMessage id={proposalState} /> : "..."}
          </div>
        </div>
      </div>
    </Link>
  );
};
