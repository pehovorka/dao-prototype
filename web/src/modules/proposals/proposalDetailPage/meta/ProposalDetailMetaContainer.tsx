import { FormattedMessage } from "react-intl";
import { useAtomValue } from "jotai";

import { HasVotedBadge, ProposalStateBadge } from "@/modules/proposals/common";
import { proposalDetailAtom } from "@/atoms";
import {
  type ProposalCreatedEvent,
  useProposalState,
} from "@/modules/proposals/hooks";
import { AddressWithAvatar } from "@/modules/common";
import { ProposalActionButtons } from "../actionButtons";

export const ProposalDetailMetaContainer = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const { state } = useProposalState(proposal.data.proposalId);

  return (
    <section className="flex justify-between items-center mb-20 gap-x-12 gap-y-4 flex-wrap">
      <div className="flex gap-2">
        <FormattedMessage id="proposal.proposer" />
        <AddressWithAvatar
          address={proposal.data.proposer}
          copyable
          responsive
          iconClassName="ml-2 h-4 fill-base-content opacity-50 transition-all hover:fill-secondary hover:opacity-100"
        />
      </div>
      <div className="flex gap-3 items-center">
        <HasVotedBadge type="list" proposalId={proposal.data.proposalId} />
        {state && <ProposalStateBadge state={state} />}
        <ProposalActionButtons />
      </div>
    </section>
  );
};
