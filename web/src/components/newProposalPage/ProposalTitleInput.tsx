import { FormattedMessage, useIntl } from "react-intl";
import type { FieldError, UseFormRegister } from "react-hook-form";

import type { FormData } from "./Form";

interface ProposalTitleInputProps {
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
}

export const ProposalTitleInput = ({
  register,
  error,
}: ProposalTitleInputProps) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <label className="label label-text text-lg">
        <FormattedMessage id="proposal.new.page.form.title.title" />
      </label>
      <input
        {...register("title", { required: true })}
        placeholder={formatMessage({
          id: "proposal.new.page.form.title.placeholder",
        })}
        className={`input input-bordered w-full ${error && "input-error"}`}
      />
      <label className="label">
        <span className="label-text-alt text-error h-5">
          {error && (
            <FormattedMessage id="proposal.new.page.form.title.required" />
          )}
        </span>
      </label>
    </>
  );
};
