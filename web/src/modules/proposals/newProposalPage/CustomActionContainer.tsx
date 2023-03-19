import { config } from "@/config";
import { governorContract, timelockContract, tokenContract } from "@/consts";
import { useEtherBalance } from "@usedapp/core";
import { constants, Contract } from "ethers";
import { FunctionFragment } from "ethers/lib/utils";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { BalanceContainer } from "../common";
import type { FormData } from "./Form";

interface CustomActionContainerProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData> | undefined;
}
export const CustomActionContainer = ({
  register,
  errors,
}: CustomActionContainerProps) => {
  const timelockContractAddress =
    config.timelockContractAddress || constants.AddressZero;
  const balance = useEtherBalance(timelockContractAddress);

  console.log(
    Object.values(contracts[0].functions).filter(
      (f) => f.stateMutability !== "view" && f.stateMutability !== "pure"
    )
  );

  return (
    <div className="my-6">
      <div className="pb-6">
        <BalanceContainer
          address={timelockContractAddress}
          currency="ETH"
          label="proposal.new.page.form.actions.action.transfer.balance.label"
        />
      </div>
      <select
        className="select select-bordered w-full"
        {...register("customFunction")}
      >
        {contracts.map((c) => (
          <optgroup label={c.name} key={c.name}>
            {Object.values(c.functions)
              .filter(
                (f) =>
                  f.stateMutability !== "view" && f.stateMutability !== "pure"
              )
              .map((f) => (
                <option value={[c.name, f.name]} key={`${c.name}_${f.name}`}>
                  {f.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

const filterFunctions = (contract: Contract) => {
  return Object.values(contract.interface.functions).filter(
    (f) => f.stateMutability !== "view" && f.stateMutability !== "pure"
  );
};

const contracts: { functions: FunctionFragment[]; name: string }[] = [
  { functions: filterFunctions(governorContract), name: "Governor" },
  { functions: filterFunctions(tokenContract), name: "Token" },
  { functions: filterFunctions(timelockContract), name: "Timelock" },
];
