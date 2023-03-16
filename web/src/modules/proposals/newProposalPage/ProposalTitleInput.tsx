import type { FieldError, UseFormRegister } from "react-hook-form";

import type { FormData } from "./Form";
import { Input } from "@/modules/ui";

interface ProposalTitleInputProps {
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
}

export const ProposalTitleInput = ({
  register,
  error,
}: ProposalTitleInputProps) => {
  return (
    <Input
      messages={{
        label: "proposal.new.page.form.title.title",
        placeholder: "proposal.new.page.form.title.placeholder",
      }}
      errorMessages={{
        required: "proposal.new.page.form.title.required",
      }}
      error={error}
      register={register}
      name="title"
    />
  );
};
