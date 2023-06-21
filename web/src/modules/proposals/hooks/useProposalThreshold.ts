import { governorContract } from "@/consts";
import { useCall } from "@usedapp/core";
import { useEffect, useState } from "react";
import type { BigNumber } from "ethers";

export const useProposalThreshold = () => {
  const [proposalThreshold, setProposalThreshold] = useState<BigNumber>();

  const { value, error } =
    useCall({
      contract: governorContract,
      method: "proposalThreshold",
      args: [],
    }) || {};

  useEffect(() => {
    if (value && value[0]) {
      setProposalThreshold(value[0]);
    }
  }, [value]);

  return proposalThreshold;
};
