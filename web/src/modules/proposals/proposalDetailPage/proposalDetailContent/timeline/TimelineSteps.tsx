import { proposalDetailAtom } from "@/atoms";
import { ProposalState } from "@/consts";
import type { ProposalCreatedEvent } from "@/modules/proposals/hooks";
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
  const { transactionHash: proposalCreatedTransaction } = useAtomValue(
    proposalDetailAtom
  ) as ProposalCreatedEvent;

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
