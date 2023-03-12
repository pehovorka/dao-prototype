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

  const createdAtBlockDetails = useBlock(proposal.data.startBlock.toNumber());
  const endsAtBlockDetails = useBlock(proposal.data.endBlock.toNumber());
  const { state } = useProposalState(proposal.data.proposalId);

  const startsAtDate =
    createdAtBlockDetails && new Date(createdAtBlockDetails?.timestamp * 1000);
  const endsAtDate =
    (endsAtBlockDetails && new Date(endsAtBlockDetails?.timestamp * 1000)) ??
    (createdAtBlockDetails &&
      getFutureBlockDate(
        createdAtBlockDetails,
        proposal.data.endBlock.toNumber()
      ));

  return (
    <SectionCard title={<FormattedMessage id="proposal.timeline.title" />}>
      {state ? (
        <ul className="steps steps-vertical">
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