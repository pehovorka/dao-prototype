import { proposalDetailAtom } from "@/atoms";
import { ProposalState } from "@/consts";
import {
  ProposalCreatedEvent,
  useProposalLifecycleEvents,
} from "@/modules/proposals/hooks";
import { useAtomValue } from "jotai";
import { Step, TimelineStep } from "./TimelineStep";

interface TimelineStepsProps {
  proposalState: (typeof ProposalState)[number];
  startsAtDate?: Date;
  endsAtDate?: Date;
}

export const TimelineSteps = ({
  proposalState,
  startsAtDate,
  endsAtDate,
}: TimelineStepsProps) => {
  const { transactionHash: proposalCreatedTransaction, data: proposalData } =
    useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const additionalLifecycleEvents = useProposalLifecycleEvents(
    proposalData.proposalId,
    proposalData.startBlock.toNumber()
  );

  switch (proposalState) {
    case "active":
      return (
        <>
          <TimelineStep
            step={Step.Created}
            date={startsAtDate}
            transactionHash={proposalCreatedTransaction}
          />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Queue} />
          <TimelineStep step={Step.Execute} />
        </>
      );
    case "defeated":
      return (
        <>
          <TimelineStep
            step={Step.Created}
            date={startsAtDate}
            transactionHash={proposalCreatedTransaction}
          />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Defeated} date={endsAtDate} />
        </>
      );
    case "succeeded":
      return (
        <>
          <TimelineStep
            step={Step.Created}
            date={startsAtDate}
            transactionHash={proposalCreatedTransaction}
          />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Succeeded} date={endsAtDate} />
        </>
      );
    case "queued":
      return (
        <>
          <TimelineStep
            step={Step.Execute}
            date={startsAtDate}
            transactionHash={proposalCreatedTransaction}
          />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Succeeded} date={endsAtDate} />
          <TimelineStep
            step={Step.Queue}
            blockNumber={additionalLifecycleEvents?.queued?.blockNumber}
            transactionHash={additionalLifecycleEvents?.queued?.transactionHash}
          />
        </>
      );
    case "executed":
      return (
        <>
          <TimelineStep
            step={Step.Execute}
            date={startsAtDate}
            transactionHash={proposalCreatedTransaction}
          />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Succeeded} date={endsAtDate} />
          <TimelineStep
            step={Step.Queue}
            blockNumber={additionalLifecycleEvents?.queued?.blockNumber}
            transactionHash={additionalLifecycleEvents?.queued?.transactionHash}
          />
          <TimelineStep
            step={Step.Execute}
            blockNumber={additionalLifecycleEvents?.executed?.blockNumber}
            transactionHash={
              additionalLifecycleEvents?.executed?.transactionHash
            }
          />
        </>
      );
    default:
      return (
        <>
          <TimelineStep
            step={Step.Created}
            date={startsAtDate}
            transactionHash={proposalCreatedTransaction}
          />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
        </>
      );
  }
};
