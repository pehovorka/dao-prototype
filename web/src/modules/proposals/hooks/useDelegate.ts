import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useContractFunction, useEthers } from "@usedapp/core";
import toast from "react-hot-toast";

import { tokenContract } from "@/consts";

export const useDelegate = () => {
  const { formatMessage } = useIntl();
  const { account } = useEthers();
  const { send, state, events } = useContractFunction(
    tokenContract,
    "delegate"
  );
  const [inProgress, setInProgress] = useState<boolean>(false);

  useEffect(() => {
    console.log("state", state);
    switch (state.status) {
      case "None":
        toast.dismiss();
        break;
      case "Mining":
        setInProgress(true);
        toast.dismiss();
        toast.loading(formatMessage({ id: "profile.delegate.state.mining" }), {
          duration: 1000000,
        });
        break;
      case "Success":
        toast.dismiss();
        toast.success(formatMessage({ id: "profile.delegate.state.success" }));
        setInProgress(false);
        break;
      case "Exception":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            { id: "profile.delegate.state.exception" },
            { error: state.errorMessage }
          )
        );
        break;
      case "Fail":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            { id: "profile.delegate.state.exception" },
            { error: state.errorMessage }
          )
        );
        break;
      default:
        break;
    }
  }, [state, formatMessage]);

  const delegate = () => {
    if (account) {
      send(account);
    } else {
      console.error("No account found");
    }
  };

  return { inProgress, setInProgress, delegate, state };
};
