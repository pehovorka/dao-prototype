import { ProposalCreatedEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";
import { useLogs } from "@usedapp/core";
import { ethers } from "ethers";
import { govenorContract } from "@/utils/governorContract";

export const useProposals = (proposalId?: string | string[] | undefined) => {
  const logs = useLogs(
    {
      contract: govenorContract,
      event: "ProposalCreated",
      args: [],
    },
    { refresh: "never" }
  );

  const proposals = logs?.value?.reverse().map((log) => ({
    ...log,
    data: log.data as ProposalCreatedEventObject,
  }));
  const error = logs?.error;

  if (proposalId) {
    if (Array.isArray(proposalId) || typeof proposalId === "undefined") {
      throw new Error("Invalid proposalId");
    }
    try {
      const proposalIdBigNumber = ethers.BigNumber.from(proposalId);
      return {
        proposals: proposals?.filter((proposal) =>
          proposal.data.proposalId.eq(proposalIdBigNumber)
        ),
        error,
      };
    } catch (e) {
      return { proposals: undefined, error: e };
    }
  }

  return { proposals, error };
};
