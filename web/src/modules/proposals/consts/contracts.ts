import { Contract } from "ethers";
import type { FunctionFragment } from "ethers/lib/utils";
import {
  governorContract,
  timelockContract,
  tokenContract,
  treasuryContract,
} from "@/consts";

const filterFunctions = (contract: Contract) => {
  return Object.values(contract.interface.functions).filter(
    (f) => f.stateMutability !== "view" && f.stateMutability !== "pure"
  );
};

interface EnhancedContract {
  functions: FunctionFragment[];
  name: string;
  interface: Contract["interface"];
  address: Contract["address"];
}

export const contracts: EnhancedContract[] = [
  {
    functions: filterFunctions(governorContract),
    name: "Governor",
    interface: governorContract.interface,
    address: governorContract.address,
  },
  {
    functions: filterFunctions(tokenContract),
    name: "Token",
    interface: tokenContract.interface,
    address: tokenContract.address,
  },
  {
    functions: filterFunctions(timelockContract),
    name: "Timelock",
    interface: timelockContract.interface,
    address: timelockContract.address,
  },
  {
    functions: filterFunctions(treasuryContract),
    name: "Treasury",
    interface: treasuryContract.interface,
    address: treasuryContract.address,
  },
];

contracts[0];
