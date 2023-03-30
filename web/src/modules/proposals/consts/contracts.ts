import { Contract } from "ethers";
import type { FunctionFragment } from "ethers/lib/utils";
import { governorContract, timelockContract, tokenContract } from "@/consts";

const filterFunctions = (contract: Contract) => {
  return Object.values(contract.interface.functions).filter(
    (f) => f.stateMutability !== "view" && f.stateMutability !== "pure"
  );
};

interface EnhancedContract {
  functions: FunctionFragment[];
  name: string;
  interface: Contract["interface"];
}

export const contracts: EnhancedContract[] = [
  {
    functions: filterFunctions(governorContract),
    name: "Governor",
    interface: governorContract.interface,
  },
  {
    functions: filterFunctions(tokenContract),
    name: "Token",
    interface: tokenContract.interface,
  },
  {
    functions: filterFunctions(timelockContract),
    name: "Timelock",
    interface: timelockContract.interface,
  },
];

contracts[0];
