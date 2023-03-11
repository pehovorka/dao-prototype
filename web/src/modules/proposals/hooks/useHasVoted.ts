import { governorContract } from "@/consts";
import { useCall, useEthers } from "@usedapp/core";
import { BigNumber, constants } from "ethers";

export const useHasVoted = (proposalId: BigNumber) => {
  const { account } = useEthers();
  const { value, error } =
    useCall({
      contract: governorContract,
      method: "hasVoted",
      args: [proposalId, account ?? constants.AddressZero],
    }) || {};

  return { hasVoted: value?.[0], error: error };
};
