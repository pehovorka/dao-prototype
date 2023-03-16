import { ViewInEtherscanButton } from "@/modules/proposals/common";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

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
}
export const TimelineStep = ({
  step,
  date,
  transactionHash,
}: TimelineStepProps) => {
  const currentDate = new Date();
  const active = date && currentDate > date;
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
          {date && (
            <div>
              <FormattedDate value={date} /> <FormattedTime value={date} />
            </div>
          )}
        </div>
        {transactionHash && (
          <ViewInEtherscanButton transactionHash={transactionHash} />
        )}
      </div>
    </li>
  );
};
