import { constants, Contract } from "ethers";
import { HomeOwnersGovernance } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

import contract from "contracts/artifacts/contracts/Governor.sol/HomeOwnersGovernance.json";

const governorContractAddress =
  process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS ?? constants.AddressZero;

export const governorContract = new Contract(
  governorContractAddress,
  contract.abi
) as HomeOwnersGovernance;
