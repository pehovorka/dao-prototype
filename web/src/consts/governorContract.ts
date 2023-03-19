import { constants, Contract } from "ethers";
import type { HomeOwnersGovernance } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

import contract from "contracts/artifacts/contracts/Governor.sol/HomeOwnersGovernance.json";
import { config } from "@/config";

const governorContractAddress =
  config.governorContractAddress ?? constants.AddressZero;

export const governorContract = new Contract(
  governorContractAddress,
  contract.abi
) as HomeOwnersGovernance;
