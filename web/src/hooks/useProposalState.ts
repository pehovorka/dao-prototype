import { governorContract, ProposalState } from "@/consts";
import { useCall } from "@usedapp/core";
import { BigNumber } from "ethers";

export const useProposalState = (proposalId: BigNumber) => {
  const { value, error } =
    useCall({
      contract: governorContract,
      method: "state",
      args: [proposalId],
    }) || {};

  if (!value) {
    return { state: undefined, error };
  }

  return { state: ProposalState[value[0]], error: error };
};
