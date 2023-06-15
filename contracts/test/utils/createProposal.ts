import { ethers } from "hardhat";
import type { HomeOwnersGovernance } from "../../typechain-types";

export const createProposal = async (
  calldata: string,
  targetContractAddress: string,
  governorContract: HomeOwnersGovernance
) => {
  const description = "This is just a test proposal";

  const descriptionHash = ethers.utils.id(description);

  const proposal = await governorContract.propose(
    [targetContractAddress],
    [0],
    [calldata],
    description
  );
  const proposalReceipt = await proposal.wait(1);
  const proposalId = proposalReceipt.events![0].args!.proposalId;

  return { proposal, proposalId, descriptionHash };
};
