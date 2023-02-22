import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

export enum Step {
  Created = "created",
  VotingEnd = "votingEnd",
  Queue = "queue",
  Execute = "execute",
}

const Icons = {
  [Step.Created]: "🎉",
  [Step.VotingEnd]: "🏁",
  [Step.Queue]: "⏳",
  [Step.Execute]: "🚀",
};

interface TimelineStepProps {
  step: Step;
  date?: Date;
}
export const TimelineStep = ({ step, date }: TimelineStepProps) => {
  const currentDate = new Date();
  const active = date && currentDate > date;
  const className = active ? "step step-primary" : "step";
  const textClassName = active
    ? "text-left text-black"
    : "text-left text-gray-500";

  return (
    <li data-content={Icons[step]} className={className}>
      <div className={textClassName}>
        <span className="font-bold">
          <FormattedMessage id={`proposal.timeline.step.${step}`} />
        </span>
        {date && (
          <div>
            <FormattedDate value={date} /> <FormattedTime value={date} />
          </div>
        )}
      </div>
    </li>
  );
};
