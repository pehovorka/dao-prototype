import { config } from "@/config";
import { useVotingPower } from "@/modules/proposals/hooks";
import { Alert } from "@/modules/ui";
import { FormattedMessage, useIntl } from "react-intl";

export const NotDelegatedVotesAlert = () => {
  const { formatMessage } = useIntl();
  const { isTokenBalanceGreaterThanVotingPower } = useVotingPower();
  if (isTokenBalanceGreaterThanVotingPower) {
    return (
      <div className="p-4">
        <Alert
          type="warning"
          message={formatMessage(
            { id: "profile.undelegatedVotes.text" },
            { tokenName: config.tokenSymbol }
          )}
          actions={
            <button className="btn btn-sm btn-primary w-full">
              <FormattedMessage id="profile.undelegatedVotes.button" />
            </button>
          }
        />
      </div>
    );
  }

  return null;
};
