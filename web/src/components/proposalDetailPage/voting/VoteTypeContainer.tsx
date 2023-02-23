import { BigNumber, FixedNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { FormattedMessage, FormattedNumber } from "react-intl";

interface VoteTypeContainerProps {
  votes: BigNumber;
  totalVotes: BigNumber;
  type: "for" | "against" | "abstain";
}
export const VoteTypeContainer = ({
  votes,
  totalVotes,
  type,
}: VoteTypeContainerProps) => {
  const percentage = !totalVotes.isZero()
    ? FixedNumber.from(votes)
        .divUnsafe(FixedNumber.from(totalVotes))
        .toUnsafeFloat()
    : 0;
  const totalPower = formatEther(votes);
  const progressClassName = getProgressClassName(type);
  return (
    <div className="card bg-base-200 shadow-md mb-4 card-compact overflow-hidden">
      <div className="card-body flex flex-row justify-between gap-10">
        <div className="min-w-0">
          <h3 className="card-title mt-0">
            <FormattedMessage id={`proposal.voting.${type}`} />
          </h3>
          <p className="mb-0 overflow-ellipsis overflow-hidden">
            <FormattedNumber
              value={percentage}
              style="percent"
              maximumFractionDigits={1}
            />
          </p>
        </div>
        <div className="flex items-center">{totalPower} HOT</div>
      </div>
      <progress className={progressClassName} value={percentage}></progress>
    </div>
  );
};

const getProgressClassName = (type: VoteTypeContainerProps["type"]) => {
  if (type === "for") return "progress progress-success";
  if (type === "against") return "progress progress-error";
  if (type === "abstain") return "progress progress-info";
};
