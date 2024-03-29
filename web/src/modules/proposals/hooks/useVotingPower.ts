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
  const [
    isTokenBalanceGreaterThanVotingPower,
    setIsTokenBalanceGreaterThanVotingPower,
  ] = useState<boolean>(false);
  const [votingPower, setVotingPower] = useState<BigNumber>();

  const memoizedBlockNumber = useMemo(() => {
    if (blockNumber) {
      return blockNumber;
    }
    if (currentBlockNumber) {
      return currentBlockNumber - 1;
    }
    return Promise.resolve(0);
  }, [blockNumber, currentBlockNumber]);

  const { value, error } =
    useCall({
      contract: tokenContract,
      method: "getPastVotes",
      args: [account ?? constants.AddressZero, memoizedBlockNumber],
    }) ?? {};

  useEffect(() => {
    if (value === undefined || value[0] === undefined) return;

    setVotingPower(value[0]);
  }, [value]);

  useEffect(() => {
    if (tokenBalance === undefined || votingPower === undefined) return;
    setIsTokenBalanceGreaterThanVotingPower(tokenBalance.gt(votingPower));
  }, [tokenBalance, votingPower]);

  return {
    votingPower,
    error,
    tokenBalance: Number(formatEther(tokenBalance ?? 0)),
    isTokenBalanceGreaterThanVotingPower,
  };
};
