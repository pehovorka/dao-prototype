import { memo } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import { useBlock } from "@/hooks";
import { ViewInEtherscanButton } from "@/modules/proposals/common";

export enum Step {
  Created = "created",
  VotingEnd = "votingEnd",
  Queue = "queue",
  Execute = "execute",
  Defeated = "defeated",
  QuorumNotReached = "quorumNotReached",
  Succeeded = "succeeded",
}

const Icons = {
  [Step.Created]: "🎉",
  [Step.VotingEnd]: "🏁",
  [Step.Queue]: "⏳",
  [Step.Execute]: "🚀",
  [Step.Defeated]: "❌",
  [Step.QuorumNotReached]: "❌",
  [Step.Succeeded]: "✅",
} as const;

interface TimelineStepProps {
  step: Step;
  date?: Date;
  transactionHash?: string;
  blockNumber?: number;
}
export const TimelineStep = memo(function TimelineStep({
  step,
  date,
  transactionHash,
  blockNumber,
}: TimelineStepProps) {
  const { date: blockDate } = useBlock(blockNumber);

  const currentDate = new Date();
  const active =
    (date && currentDate > date) || (blockDate && currentDate > blockDate);
  const className = active ? "step step-primary" : "step";
  const textClassName = active
    ? "text-left text-base flex justify-between items-center w-full"
    : "text-left opacity-60 flex justify-between w-full";

  return (
    <li data-content={Icons[step]} className={className}>
      <div className={textClassName}>
        <div>
          <span className="font-bold">
            <FormattedMessage id={`proposal.timeline.step.${step}`} />
          </span>
          {(date || blockDate) && (
            <div>
              <FormattedDate value={date ?? blockDate} />{" "}
              <FormattedTime value={date ?? blockDate} />
            </div>
          )}
        </div>
        {transactionHash && (
          <ViewInEtherscanButton transactionHash={transactionHash} />
        )}
      </div>
    </li>
  );
});
