import { config } from "@/config";
import { constants, Contract } from "ethers";
import { FunctionFragment } from "ethers/lib/utils";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { governorContract, timelockContract, tokenContract } from "@/consts";
import { getValidationOptionsByDataType, SolidityDataType } from "@/utils";
import { BalanceContainer } from "../common";
import { Alert, Input } from "@/modules/ui";
import type { FormData } from "./Form";

export const CustomActionContainer = () => {
  const { formatMessage } = useIntl();
  const timelockContractAddress =
    config.timelockContractAddress || constants.AddressZero;

  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext<FormData>();

  const { fields, replace } = useFieldArray<FormData, "customFunctionInputs">({
    name: "customFunctionInputs",
  });

  return (
    <div className="my-6">
      <>
        <div className="pb-6 grid md:grid-cols-oneThird gap-6">
          <BalanceContainer
            address={timelockContractAddress}
            currency="ETH"
            label="proposal.new.page.form.actions.action.transfer.balance.label"
          />
          <Alert
            type="warning"
            message={formatMessage({
              id: "proposal.actions.custom.disclaimer.text",
            })}
          />
        </div>
        <label className="label label-text text-lg">
          <FormattedMessage id="proposal.actions.custom.title" />
        </label>
        <select
          className="select select-bordered w-full"
          {...(register("customFunctionName", { required: true }),
          {
            defaultValue: "",
            onChange: (e) => {
              const [contractName, functionName] = e.target.value.split(",");
              const contract = contracts.find((c) => c.name === contractName);
              if (contract) {
                const functionFragment = contract.functions.find(
                  (f) => f.name === functionName
                );

                if (functionFragment) {
                  replace(
                    functionFragment.inputs.map((input, index) => ({
                      name: input.name || index,
                      dataType: input.type as SolidityDataType,
                    }))
                  );
                }
              }
              setValue("customFunctionName", [contractName, functionName]);
              clearErrors();
            },
          })}
        >
          <option value="" disabled>
            {formatMessage({ id: "proposal.actions.custom.placeholder" })}
          </option>
          {contracts.map((c) => (
            <optgroup label={c.name} key={c.name}>
              {Object.values(c.functions).map((f) => (
                <option value={[c.name, f.name]} key={`${c.name}_${f.name}`}>
                  {f.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.customFunctionName && (
          <label className="label">
            <span className="label-text-alt text-error h-5">
              {formatMessage({
                id: "proposal.actions.custom.field.error.required",
              })}
            </span>
          </label>
        )}
        {fields.map((field, index) => {
          return (
            <Input
              name={`customFunctionInputs.${index}.value`}
              register={register}
              options={getValidationOptionsByDataType(field.dataType)}
              key={field.id}
              messages={{
                label: field.name.toString() ?? index.toString(),
                placeholder: field.dataType,
              }}
              error={errors.customFunctionInputs?.[index]?.value}
              errorMessages={{
                required: formatMessage({
                  id: "proposal.actions.custom.field.error.required",
                }),
                pattern: formatMessage(
                  {
                    id: "proposal.actions.custom.field.error.pattern",
                  },
                  { dataType: field.dataType }
                ),
                min: formatMessage(
                  {
                    id: "proposal.actions.custom.field.error.min",
                  },
                  { dataType: field.dataType }
                ),
                max: formatMessage(
                  {
                    id: "proposal.actions.custom.field.error.max",
                  },
                  { dataType: field.dataType }
                ),
              }}
            />
          );
        })}
      </>
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
