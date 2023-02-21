import { Contract } from "ethers";
import { HomeOwnersGovernance } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

import governorContract from "contracts/artifacts/contracts/Governor.sol/HomeOwnersGovernance.json";

const governorContractAddress =
  process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS || "";

export const govenorContract = new Contract(
  governorContractAddress,
  governorContract.abi
) as HomeOwnersGovernance;
