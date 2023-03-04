import { useEffect, useMemo, useState } from "react";
import { tokenContract } from "@/consts";
import { useCall, useEthers, useBlockNumber } from "@usedapp/core";
import { constants } from "ethers";
import { formatEther } from "ethers/lib/utils";

export const useVotingPower = (blockNumber?: number) => {
  const { account } = useEthers();
  const currentBlockNumber = useBlockNumber();
  const [votingPower, setVotingPower] = useState<string | undefined>(undefined);

  const memoizedBlockNumber = useMemo(() => {
    if (blockNumber) {
      return blockNumber;
    }
    if (currentBlockNumber) {
      return currentBlockNumber - 1;
    }
    return 0;
  }, [blockNumber, currentBlockNumber]);

  const { value, error } =
    useCall(
      {
        contract: tokenContract,
        method: "getPastVotes",
        args: [account ?? constants.AddressZero, memoizedBlockNumber],
      },
      { refresh: "never" }
    ) ?? {};

  useEffect(() => {
    if (value && value[0]) {
      setVotingPower(formatEther(value[0]));
    }
  }, [value]);

  return { votingPower, error };
};
