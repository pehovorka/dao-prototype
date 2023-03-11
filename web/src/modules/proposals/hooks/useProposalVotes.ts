import { governorContract, tokenContract } from "@/consts";
import { useCall } from "@usedapp/core";
import { BigNumber, FixedNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useMemo } from "react";

export const useProposalVotes = (
  blockNumber: number,
  proposalId: BigNumber
) => {
  const { value: numerator, error: numeratorError } =
    useCall({
      contract: governorContract,
      method: "quorumNumerator(uint256)",
      args: [blockNumber],
    }) || {};

  const { value: supply, error: supplyError } =
    useCall({
      contract: tokenContract,
      method: "getPastTotalSupply",
      args: [blockNumber],
    }) || {};

  const { value: votes, error: votesError } =
    useCall({
      contract: governorContract,
      method: "proposalVotes",
      args: [proposalId],
    }) || {};

  const totalVotes = useMemo(() => {
    if (!votes) return;
    const totalVotes = votes.forVotes
      .add(votes.againstVotes)
      .add(votes.abstainVotes);
    return totalVotes;
  }, [votes]);

  const isQuorumReached = useMemo(() => {
    if (!numerator || !totalVotes) return;
    return Number(formatEther(totalVotes)) > numerator[0].toNumber();
  }, [totalVotes, numerator]);

  const participationRate = useMemo(() => {
    if (!totalVotes || !supply) return;
    return !supply[0].isZero()
      ? FixedNumber.from(totalVotes)
          .divUnsafe(FixedNumber.from(supply[0]))
          .toUnsafeFloat()
      : 0;
  }, [totalVotes, supply]);

  return {
    numerator: numerator?.[0].toNumber(),
    numeratorError: numeratorError,
    supply: Number(formatEther(supply?.[0] ?? BigNumber.from(0))),
    supplyError: supplyError,
    isQuorumReached,
    votes: {
      totalVotes,
      forVotes: votes?.forVotes,
      againstVotes: votes?.againstVotes,
      abstainVotes: votes?.abstainVotes,
      error: votesError,
    },
    participationRate,
  };
};
