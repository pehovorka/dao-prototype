import { useHasVoted } from "@/hooks";
import { FormattedMessage } from "react-intl";
import type { BigNumber } from "ethers";

interface HasVotedBadgeProps {
  proposalId: BigNumber;
  type: "list" | "detail";
}

export const HasVotedBadge = ({ proposalId, type }: HasVotedBadgeProps) => {
  const { hasVoted } = useHasVoted(proposalId);

  return hasVoted ? (
    <div
      className={`badge ${
        type === "list" ? "badge-md py-3" : "badge-lg py-5 font-bold border-2"
      } badge-outline badge-secondary whitespace-nowrap`}
    >
      <FormattedMessage id={`proposal.voting.hasVoted`} />
    </div>
  ) : (
    <></>
  );
};
