import { constants, Contract } from "ethers";
import type { Treasury } from "contracts/typechain-types/contracts/Treasury";

import contract from "contracts/artifacts/contracts/Treasury.sol/Treasury.json";
import { config } from "@/config";

const treasuryContractAddress =
  config.treasuryContractAddress ?? constants.AddressZero;

export const treasuryContract = new Contract(
  treasuryContractAddress,
  contract.abi
) as Treasury;
