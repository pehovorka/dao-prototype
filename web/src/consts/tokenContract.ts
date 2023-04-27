import { constants, Contract } from "ethers";
import type { HomeOwnersToken } from "contracts/typechain-types/contracts/Token.sol/HomeOwnersToken";

import contract from "contracts/artifacts/contracts/Token.sol/HomeOwnersToken.json";
import { config } from "@/config";

const tokenContractAddress =
  config.tokenContractAddress ?? constants.AddressZero;

export const tokenContract = new Contract(
  tokenContractAddress,
  contract.abi
) as HomeOwnersToken;
