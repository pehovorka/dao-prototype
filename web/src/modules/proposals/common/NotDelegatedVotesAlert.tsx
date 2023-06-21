import { FormattedMessage, useIntl } from "react-intl";

import { config } from "@/config";
import {
  useDelegate,
  useNotDelegatedVotingPower,
  useVotingPower,
} from "@/modules/proposals/hooks";
import { Alert } from "@/modules/ui";

export const NotDelegatedVotesAlert = () => {
  const { formatMessage } = useIntl();
  const { tokenBalance } = useVotingPower();
  const { delegate, inProgress } = useDelegate();
  const notDelegated = useNotDelegatedVotingPower();

  if (notDelegated) {
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
