import { Alert } from "@/modules/ui";
import { useDelegate, useProposalThreshold, useVotingPower } from "../hooks";
import { FormattedMessage } from "react-intl";
import { config } from "@/config";

export const VotingPowerAlert = () => {
  const { votingPower, isTokenBalanceGreaterThanVotingPower, tokenBalance } =
    useVotingPower();
  const proposalThreshold = useProposalThreshold();
  const { delegate, inProgress } = useDelegate();

  if (proposalThreshold && votingPower?.lt(proposalThreshold)) {
    if (isTokenBalanceGreaterThanVotingPower) {
      return (
        <div className="pb-6">
          <Alert
            type="error"
            noWrap
            message={
              <FormattedMessage
                id="proposal.new.page.form.undelegatedVotesAlert"
                values={{ token: config.tokenSymbol }}
              />
            }
            actions={
              <button
                className={`btn btn-sm btn-primary ${inProgress && "loading"}`}
                onClick={delegate}
              >
                <FormattedMessage
                  id="profile.undelegatedVotes.button"
                  values={{ tokenBalance, tokenName: config.tokenSymbol }}
                />
              </button>
            }
          />
        </div>
      );
    }
    return (
      <div className="pb-6">
        <Alert
          type="error"
          message={
            <FormattedMessage id="proposal.new.page.form.notEnoughVotesAlert" />
          }
        />
      </div>
    );
  }

  return null;
};
