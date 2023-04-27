import { useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import { formatEther } from "ethers/lib/utils";
import { useEtherBalance } from "@usedapp/core";

import type { FormData } from "./Form";
import { BalanceContainer } from "../common";
import { Input } from "@/modules/ui";
import { treasuryContract } from "@/consts";

export const TransferFundsActionContainer = () => {
  const { formatMessage } = useIntl();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  const balance = useEtherBalance(treasuryContract.address);
  const balanceNumber = balance ? Number(formatEther(balance)) : 0;

  return (
    <div className="my-6">
      <div className="pb-6">
        <BalanceContainer
          address={treasuryContract.address}
          currency="ETH"
          label="proposal.new.page.form.actions.action.transfer.balance.label"
        />
      </div>
      <Input
        messages={{
          label: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.address.title",
          }),
          placeholder: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.address.placeholder",
          }),
        }}
        errorMessages={{
          pattern: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.address.error.pattern",
          }),
          required: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.address.error.required",
          }),
        }}
        error={errors?.transferAddress}
        register={register}
        name="transferAddress"
        options={{ required: true, pattern: /^0x[a-fA-F0-9]{40}$/g }}
      />
      <Input
        messages={{
          label: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.amount.title",
          }),
          placeholder: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.amount.placeholder",
          }),
          innerRightLabel: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.amount.currency",
          }),
        }}
        errorMessages={{
          required: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.amount.error.required",
          }),
          max: formatMessage({
            id: "proposal.new.page.form.actions.action.transfer.amount.error.max",
          }),
        }}
        error={errors?.transferAmount}
        register={register}
        name="transferAmount"
        type="number"
        step="any"
        options={{ required: true, max: balanceNumber }}
      />
    </div>
  );
};
