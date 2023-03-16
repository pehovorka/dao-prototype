import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { FormData } from "./Form";
import { Input } from "@/modules/ui";

interface TransferFundsActionContainerProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData> | undefined;
}
export const TransferFundsActionContainer = ({
  register,
  errors,
}: TransferFundsActionContainerProps) => {
  return (
    <div className="my-6">
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
        }}
        error={errors?.transferAmount}
        register={register}
        name="transferAmount"
        type="number"
      />
    </div>
  );
};
