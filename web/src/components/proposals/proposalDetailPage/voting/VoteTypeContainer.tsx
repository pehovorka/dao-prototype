import { BigNumber, FixedNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { VoteTypeContainerCard } from "./VoteTypeContainerCard";

export interface VoteTypeContainerProps {
  votes?: BigNumber;
  totalVotes?: BigNumber;
  type: "for" | "against" | "abstain";
}
export const VoteTypeContainer = ({
  votes,
  totalVotes,
  type,
}: VoteTypeContainerProps) => {
  const progressClassName = getProgressClassName(type);

  if (!votes || !totalVotes) {
    return (
      <VoteTypeContainerCard
        type={type}
        progressClassName={progressClassName}
      />
    );
  }

  const percentage = !totalVotes.isZero()
    ? FixedNumber.from(votes)
        .divUnsafe(FixedNumber.from(totalVotes))
        .toUnsafeFloat()
    : 0;
  const totalPower = formatEther(votes);

  return (
    <VoteTypeContainerCard
      type={type}
      progressClassName={progressClassName}
      percentage={percentage}
      totalPower={totalPower}
    />
  );
};

const getProgressClassName = (type: VoteTypeContainerProps["type"]) => {
  if (type === "for") return "progress progress-success";
  if (type === "against") return "progress progress-error";
  if (type === "abstain") return "progress progress-info";
  return "progress progress-success";
};
