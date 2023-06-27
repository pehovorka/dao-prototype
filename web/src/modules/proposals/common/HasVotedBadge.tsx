import { FormattedMessage } from "react-intl";
import type { BigNumber } from "ethers";
import { useHasVoted } from "@/modules/proposals/hooks";
import { InfoIcon } from "@/assets/icons";

interface HasVotedBadgeProps {
  proposalId: BigNumber;
  type: "list" | "detail";
}

export const HasVotedBadge = ({ proposalId, type }: HasVotedBadgeProps) => {
  const { hasVoted } = useHasVoted(proposalId);

  return hasVoted ? (
    <div
      className={`badge ${
        type === "list" ? "badge-md py-3" : "badge-lg py-5 border-2 text-lg"
      }  badge-ghost bg-base-100 whitespace-nowrap border-1 border-base-300`}
    >
      <InfoIcon
        className={`${
          type === "list" ? "w-4 h-4 mr-1" : "w-8 h-8 mr-2"
        } fill-info`}
      />
      <FormattedMessage id={`proposal.voting.hasVoted`} />
    </div>
  ) : (
    <></>
  );
};
