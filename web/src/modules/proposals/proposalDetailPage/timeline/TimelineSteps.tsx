import { ProposalState } from "@/consts";
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
  switch (proposalState) {
    case "active":
      return (
        <>
          <TimelineStep step={Step.Created} date={startsAtDate} />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Queue} />
          <TimelineStep step={Step.Execute} />
        </>
      );
    case "defeated":
      return (
        <>
          <TimelineStep step={Step.Created} date={startsAtDate} />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Defeated} date={endsAtDate} />
        </>
      );
    case "succeeded":
      return (
        <>
          <TimelineStep step={Step.Created} date={startsAtDate} />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
          <TimelineStep step={Step.Succeeded} date={endsAtDate} />
        </>
      );
    default:
      return (
        <>
          <TimelineStep step={Step.Created} date={startsAtDate} />
          <TimelineStep step={Step.VotingEnd} date={endsAtDate} />
        </>
      );
  }
};
