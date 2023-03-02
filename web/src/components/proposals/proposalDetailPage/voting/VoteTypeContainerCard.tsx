import { FormattedMessage, FormattedNumber } from "react-intl";
import type { VoteTypeContainerProps } from "./VoteTypeContainer";

interface VoteTypeContainerCardProps {
  type: VoteTypeContainerProps["type"];
  percentage?: number;
  totalPower?: string;
  progressClassName: string;
}
export const VoteTypeContainerCard = ({
  type,
  percentage,
  totalPower,
  progressClassName,
}: VoteTypeContainerCardProps) => (
  <div className="card bg-base-200 shadow-md mb-4 card-compact overflow-hidden">
    <div className="card-body flex flex-row justify-between gap-10">
      <div className="min-w-0">
        <h3 className="card-title mt-0">
          <FormattedMessage id={`proposal.voting.${type}`} />
        </h3>
        <p className="mb-0 overflow-ellipsis overflow-hidden">
          {percentage !== undefined ? (
            <FormattedNumber
              value={percentage}
              style="percent"
              maximumFractionDigits={1}
            />
          ) : (
            "..."
          )}
        </p>
      </div>
      <div className="flex items-center">
        {totalPower ? <FormattedNumber value={Number(totalPower)} /> : "..."}{" "}
        HOT
      </div>
    </div>
    <progress className={progressClassName} value={percentage}></progress>
  </div>
);
