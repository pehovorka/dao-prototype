import { BigNumber } from "ethers";
import { useBlock, useProposalState } from "@/hooks";
import { ProposalState } from "@/consts";
import { Block } from "@ethersproject/abstract-provider";
import { Step, TimelineStep } from "./TimelineStep";

const BLOCK_SECONDS = 12;

const getFutureBlockDate = (
  createdAtBlockDetails: Block,
  endsAtBlockNumber: number
) => {
  const blocksDifference = endsAtBlockNumber - createdAtBlockDetails.number;
  const secondsDifference = blocksDifference * BLOCK_SECONDS;

  const endsAtTimestamp =
    createdAtBlockDetails?.timestamp &&
    createdAtBlockDetails?.timestamp + secondsDifference;

  if (endsAtTimestamp) return new Date(endsAtTimestamp * 1000);

  return undefined;
};

interface TimelineProps {
  proposalId: BigNumber;
  createdAtBlock: number;
  endsAtBlock: number;
}
export const Timeline = ({
  proposalId,
  createdAtBlock,
  endsAtBlock,
}: TimelineProps) => {
  const createdAtBlockDetails = useBlock(createdAtBlock);
  const { state } = useProposalState(proposalId);

  const startsAtDate =
    createdAtBlockDetails && new Date(createdAtBlockDetails?.timestamp * 1000);
  const endsAtDate =
    createdAtBlockDetails &&
    getFutureBlockDate(createdAtBlockDetails, endsAtBlock);

  const steps = state && getSteps(state, startsAtDate, endsAtDate);

  return (
    <div className="artboard">
      <ul className="steps steps-vertical">{steps}</ul>
    </div>
  );
};

const getSteps = (
  proposalState: (typeof ProposalState)[number],
  startsAtDate?: Date,
  endsAtDate?: Date
) => {
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
          <TimelineStep step={Step.Defeated} />
        </>
      );
    default:
      return null;
  }
};
