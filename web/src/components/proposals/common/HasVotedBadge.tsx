import { useHasVoted } from "@/hooks";
import { FormattedMessage } from "react-intl";
import type { BigNumber } from "ethers";

interface HasVotedBadgeProps {
  proposalId: BigNumber;
}

export const HasVotedBadge = ({ proposalId }: HasVotedBadgeProps) => {
  const { hasVoted } = useHasVoted(proposalId);

  return hasVoted ? (
    <div
      className={
        "badge badge-md badge-outline badge-secondary py-3 whitespace-nowrap"
      }
    >
      <FormattedMessage id={`proposal.voting.hasVoted`} />
    </div>
  ) : (
    <></>
  );
};
