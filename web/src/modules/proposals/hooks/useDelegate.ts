import { useEthers } from "@usedapp/core";

import { tokenContract } from "@/consts";
import { useContractFunctionFlow } from "./useContractFunctionFlow";

export const useDelegate = () => {
  const { account } = useEthers();

  const { send, state, inProgress, setInProgress } = useContractFunctionFlow(
    tokenContract,
    "delegate",
    undefined,
    {
      mining: "profile.delegate.state.mining",
      success: "profile.delegate.state.success",
      exception: "profile.delegate.state.exception",
    }
  );

  const delegate = () => {
    if (account) {
      send(account);
    } else {
      console.error("No account found");
    }
  };

  return { inProgress, setInProgress, delegate, state };
};
