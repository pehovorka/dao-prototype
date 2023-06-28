import { FormattedMessage, FormattedNumber } from "react-intl";

import { config } from "@/config";
import { useVotingPower } from "@/modules/proposals/hooks";
import { formatEther } from "ethers/lib/utils";

interface VotingPowerProps {
  blockNumber?: number;
}
export const VotingPower = ({ blockNumber }: VotingPowerProps) => {
  const { votingPower } = useVotingPower(blockNumber);
  return (
    <div className="stats">
      <div className="stat p-4">
        <div className="stat-title">
          <FormattedMessage id="profile.votingPower.text" />
        </div>
        {votingPower === undefined && (
          <div className="text-xl font-bold">...</div>
        )}
        {votingPower !== undefined && (
          <div className="text-xl font-bold">
            <FormattedNumber value={Number(formatEther(votingPower))} />{" "}
            {config.tokenSymbol}
          </div>
        )}
      </div>
    </div>
  );
};
