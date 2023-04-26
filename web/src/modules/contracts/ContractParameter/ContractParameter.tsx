import { useCall } from "@usedapp/core";
import {
  ContractMethodNames,
  Params,
  TypedContract,
} from "@usedapp/core/dist/esm/src/model";
import { BigNumber } from "ethers";

interface ContractParameterProps<
  T extends TypedContract,
  MN extends ContractMethodNames<T>
> {
  contract: T;
  method: MN;
  args: Params<T, MN>;
}
export const ContractParameter = <
  T extends TypedContract,
  MN extends ContractMethodNames<T>
>({
  contract,
  method,
  args,
}: ContractParameterProps<T, MN>) => {
  const { value } = useCall({ contract, method, args }) || {};

  if (!value) return null;

  if (Array.isArray(value)) {
    return (
      <div>
        {value.map((v: unknown, i: number) => {
          if (BigNumber.isBigNumber(v)) {
            return <div key={i}>{`${method}: ${v.toString()}`}</div>;
          }
          return <div key={i}>{`${method}: ${v}`}</div>;
        })}
      </div>
    );
  }

  return null;
};
