import { FormattedMessage, useIntl } from "react-intl";

import { config } from "@/config";
import { useDelegate, useVotingPower } from "@/modules/proposals/hooks";
import { Alert } from "@/modules/ui";

export const NotDelegatedVotesAlert = () => {
  const { formatMessage } = useIntl();
  const { isTokenBalanceGreaterThanVotingPower, tokenBalance } =
    useVotingPower();
  const { delegate, inProgress, state } = useDelegate();

  if (isTokenBalanceGreaterThanVotingPower && state.status !== "Success") {
    return (
      <div className="p-4">
        <Alert
          type="warning"
          message={formatMessage(
            { id: "profile.undelegatedVotes.text" },
            { tokenName: config.tokenSymbol }
          )}
          actions={
            <button
              className={`btn btn-sm btn-primary w-full ${
                inProgress && "loading"
              }`}
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

  return null;
};
