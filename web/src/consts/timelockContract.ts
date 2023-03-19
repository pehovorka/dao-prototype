import { constants, Contract } from "ethers";
import type { TimelockController } from "contracts/typechain-types/@openzeppelin/contracts/governance/TimelockController";

import contract from "contracts/artifacts/@openzeppelin/contracts/governance/TimelockController.sol/TimelockController.json";
import { config } from "@/config";

const timelockContractAddress =
  config.timelockContractAddress ?? constants.AddressZero;

export const timelockContract = new Contract(
  timelockContractAddress,
  contract.abi
) as TimelockController;
