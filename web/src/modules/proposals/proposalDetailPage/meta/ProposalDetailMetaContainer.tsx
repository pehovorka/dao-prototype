import { useAtomValue } from "jotai";
import Blockies from "react-blockies";

import { ProposalStateBadge } from "@/modules/proposals/common";
import { proposalDetailAtom } from "@/atoms";
import {
  type ProposalCreatedEvent,
  useProposalState,
} from "@/modules/proposals/hooks";
import { FormattedMessage } from "react-intl";

export const ProposalDetailMetaContainer = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const { state } = useProposalState(proposal.data.proposalId);

  return (
    <section className="flex items-center mb-20 gap-x-12 gap-y-4 flex-wrap">
      <div className="flex gap-4 items-center">
        <div className="w-8 h-8 mask mask-squircle">
          <Blockies seed={proposal.data.proposer} size={10} scale={3.2} />
        </div>
        <span className="text-sm break-all md:text-lg">
          <FormattedMessage
            id="proposal.proposedBy"
            values={{ name: proposal.data.proposer }}
          />
        </span>
      </div>
      {state && <ProposalStateBadge state={state} />}
    </section>
  );
};
