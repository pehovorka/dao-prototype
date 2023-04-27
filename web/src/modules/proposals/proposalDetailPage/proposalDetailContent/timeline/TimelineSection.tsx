import { useBlock } from "@/hooks";
import {
  type ProposalCreatedEvent,
  useProposalState,
} from "@/modules/proposals/hooks";
import { useAtomValue } from "jotai";
import { proposalDetailAtom } from "@/atoms";
import { SectionCard, Skeleton } from "@/modules/ui";
import { FormattedMessage } from "react-intl";
import { getFutureBlockDate } from "./utils";
import { TimelineSteps } from "./TimelineSteps";

export const TimelineSection = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const createdAtBlock = useBlock(proposal.data.startBlock.toNumber());
  const endsAtBlock = useBlock(proposal.data.endBlock.toNumber());
  const { state } = useProposalState(proposal.data.proposalId);

  const startsAtDate = createdAtBlock && createdAtBlock.date;
  const endsAtDate =
    (endsAtBlock && endsAtBlock.date) ??
    (createdAtBlock.block &&
      getFutureBlockDate(
        createdAtBlock.block,
        proposal.data.endBlock.toNumber()
      ));

  return (
    <SectionCard title={<FormattedMessage id="proposal.timeline.title" />}>
      {state ? (
        <ul className="steps steps-vertical overflow-visible">
          <TimelineSteps
            proposalState={state}
            startsAtDate={startsAtDate}
            endsAtDate={endsAtDate}
          />
        </ul>
      ) : (
        <div className="w-1/2">
          <Skeleton type="TEXT" />
        </div>
      )}
    </SectionCard>
  );
};
