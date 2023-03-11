import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useContractFunction } from "@usedapp/core";
import toast from "react-hot-toast";
import { governorContract } from "@/consts/governorContract";

export type Vote = "for" | "against" | "abstain";

export const voteToSupportMap = {
  against: 0,
  for: 1,
  abstain: 2,
} as const;

export const useVote = () => {
  const { formatMessage } = useIntl();
  const { send, state, events } = useContractFunction(
    governorContract,
    "castVote"
  );
  const [inProgress, setInProgress] = useState<boolean>(false);

  useEffect(() => {
    console.log("state", state);
    switch (state.status) {
      case "None":
        toast.dismiss();
        break;
      case "Mining":
        toast.dismiss();
        toast.loading(
          formatMessage({ id: "proposal.voting.vote.state.mining" }),
          {
            duration: 1000000,
          }
        );
        break;
      case "Success":
        toast.dismiss();
        toast.success(
          formatMessage({ id: "proposal.voting.vote.state.success" })
        );
        setInProgress(false);
        break;
      case "Exception":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            { id: "proposal.voting.vote.state.exception" },
            { error: state.errorMessage }
          )
        );
        break;
      case "Fail":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            { id: "proposal.voting.vote.state.exception" },
            { error: state.errorMessage }
          )
        );
        break;
      default:
        break;
    }
  }, [state, formatMessage]);

  return { inProgress, setInProgress, castVote: send, state };
};
