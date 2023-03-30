import { useFormContext } from "react-hook-form";

import type { FormData } from "./Form";
import { Input } from "@/modules/ui";
import { useIntl } from "react-intl";

export const ProposalTitleInput = () => {
  const { formatMessage } = useIntl();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  return (
    <Input
      messages={{
        label: formatMessage({ id: "proposal.new.page.form.title.title" }),
        placeholder: formatMessage({
          id: "proposal.new.page.form.title.placeholder",
        }),
      }}
      errorMessages={{
        required: formatMessage({
          id: "proposal.new.page.form.title.required",
        }),
      }}
      error={errors.title}
      register={register}
      name="title"
    />
  );
};
