import { useEffect, useState } from "react";
import { type ProposalCreatedEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";
import { useLogs } from "@usedapp/core";
import { ethers } from "ethers";

import { governorContract } from "@/consts/governorContract";

export interface ProposalCreatedEvent {
  data: ProposalCreatedEventObject;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  transactionHash: string;
  removed: boolean;
}

export const useProposals = (proposalId?: string | string[] | undefined) => {
  const [proposals, setProposals] = useState<
    ProposalCreatedEvent[] | undefined
  >(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  // Workaround for rerenders caused by useLogs
  // More info here: https://github.com/TrueFiEng/useDApp/pull/1045#issuecomment-1403793564
  const [hasRendered, setHasRendered] = useState(false);

  const logs = useLogs({
    contract: governorContract,
    event: "ProposalCreated",
    args: [],
  });

  useEffect(() => {
    if (!logs?.value || hasRendered) return;

    const allProposals: ProposalCreatedEvent[] = logs.value
      .reverse()
      .map((log) => ({
        ...log,
        data: log.data as ProposalCreatedEventObject,
      }));
    setError(logs?.error);

    if (proposalId) {
      if (Array.isArray(proposalId) || typeof proposalId === "undefined") {
        throw new Error("Invalid proposalId");
      }
      try {
        const proposalIdBigNumber = ethers.BigNumber.from(proposalId);
        setProposals(
          allProposals?.filter((proposal) =>
            proposal.data.proposalId.eq(proposalIdBigNumber)
          )
        );
      } catch (e) {
        setError(e as Error);
      }
    } else {
      setProposals(allProposals);
    }
    setHasRendered(true);
  }, [logs, proposalId, hasRendered]);

  return { proposals, error };
};
