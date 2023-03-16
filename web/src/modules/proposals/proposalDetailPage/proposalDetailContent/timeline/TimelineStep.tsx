import { NewTabIcon } from "@/assets/icons/NewTabIcon";
import {
  FormattedDate,
  FormattedMessage,
  FormattedTime,
  useIntl,
} from "react-intl";

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
  const { formatMessage } = useIntl();

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
          <div
            className="tooltip tooltip-left"
            data-tip={formatMessage({
              id: "proposal.timeline.openOnEtherscan",
            })}
          >
            <a
              href={`https://goerli.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              <NewTabIcon className="fill-primary w-5 h-5 hover:fill-primary-focus" />
            </a>
          </div>
        )}
      </div>
    </li>
  );
};
