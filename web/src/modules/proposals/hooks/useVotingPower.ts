import { useEffect, useMemo, useState } from "react";
import { BigNumber, constants } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { tokenContract } from "@/consts";
import {
  useCall,
  useEthers,
  useBlockNumber,
  useTokenBalance,
} from "@usedapp/core";
import { config } from "@/config";

export const useVotingPower = (blockNumber?: number) => {
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(config.tokenContractAddress, account);
  const currentBlockNumber = useBlockNumber();
  const [votingPower, setVotingPower] = useState<BigNumber | undefined>(
    undefined
  );

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
      setVotingPower(value[0]);
    }
  }, [value]);

  const isTokenBalanceGreaterThanVotingPower = useMemo(() => {
    if (tokenBalance === undefined || votingPower === undefined) return;
    return tokenBalance.gt(votingPower);
  }, [tokenBalance, votingPower]);

  return {
    votingPower: Number(formatEther(votingPower ?? 0)),
    error,
    tokenBalance: Number(formatEther(tokenBalance ?? 0)),
    isTokenBalanceGreaterThanVotingPower,
  };
};
