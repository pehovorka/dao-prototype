import { constants, Contract } from "ethers";
import { HomeOwnersToken } from "contracts/typechain-types/contracts/Token.sol/HomeOwnersToken";

import contract from "contracts/artifacts/contracts/Token.sol/HomeOwnersToken.json";

const tokenContractAddress =
  process.env.NEXT_PUBLIC_TOKEN_ADDRESS ?? constants.AddressZero;

export const tokenContract = new Contract(
  tokenContractAddress,
  contract.abi
) as HomeOwnersToken;
