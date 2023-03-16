import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { constants } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEtherBalance } from "@usedapp/core";

import type { FormData } from "./Form";
import { BalanceContainer } from "../common";
import { Input } from "@/modules/ui";
import { config } from "@/config";

interface TransferFundsActionContainerProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData> | undefined;
}
export const TransferFundsActionContainer = ({
  register,
  errors,
}: TransferFundsActionContainerProps) => {
  const timelockContractAddress =
    config.timelockContractAddress || constants.AddressZero;
  const balance = useEtherBalance(timelockContractAddress);
  const balanceNumber = balance ? Number(formatEther(balance)) : 0;

  return (
    <div className="my-6">
      <div className="pb-6">
        <BalanceContainer
          address={timelockContractAddress}
          currency="ETH"
          label="proposal.new.page.form.actions.action.transfer.balance.label"
        />
      </div>
      <Input
        messages={{
          label: "proposal.new.page.form.actions.action.transfer.address.title",
          placeholder:
            "proposal.new.page.form.actions.action.transfer.address.placeholder",
        }}
        errorMessages={{
          pattern:
            "proposal.new.page.form.actions.action.transfer.address.error.pattern",
          required:
            "proposal.new.page.form.actions.action.transfer.address.error.required",
        }}
        error={errors?.transferAddress}
        register={register}
        name="transferAddress"
        options={{ required: true, pattern: /^0x[a-fA-F0-9]{40}$/g }}
      />
      <Input
        messages={{
          label: "proposal.new.page.form.actions.action.transfer.amount.title",
          placeholder:
            "proposal.new.page.form.actions.action.transfer.amount.placeholder",
          innerRightLabel:
            "proposal.new.page.form.actions.action.transfer.amount.currency",
        }}
        errorMessages={{
          required:
            "proposal.new.page.form.actions.action.transfer.amount.error.required",
          max: "proposal.new.page.form.actions.action.transfer.amount.error.max",
        }}
        error={errors?.transferAmount}
        register={register}
        name="transferAmount"
        type="number"
        options={{ required: true, max: balanceNumber }}
      />
    </div>
  );
};
