import { HTMLInputTypeAttribute } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FormattedMessage, type MessageDescriptor, useIntl } from "react-intl";

interface InputProps<FormData extends FieldValues> {
  messages: {
    label: MessageDescriptor["id"];
    placeholder: MessageDescriptor["id"];
    innerLeftLabel?: MessageDescriptor["id"];
    innerRightLabel?: MessageDescriptor["id"];
  };
  errorMessages: {
    [key in FieldError["type"]]?: MessageDescriptor["id"];
  };
  error?: FieldError | undefined;
  register: UseFormRegister<FormData>;
  name: Path<FormData>;
  options?: RegisterOptions;
  type?: HTMLInputTypeAttribute;
}
export const Input = <FormData extends FieldValues>({
  messages,
  errorMessages,
  error,
  register,
  name,
  type = "text",
  options = { required: true },
}: InputProps<FormData>) => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <label className="label label-text text-lg">
        <FormattedMessage id={messages.label} />
      </label>
      <label className="input-group">
        {messages.innerLeftLabel && (
          <span>
            <FormattedMessage id={messages.innerLeftLabel} />
          </span>
        )}
        <input
          {...register(name, options)}
          placeholder={formatMessage({
            id: messages.placeholder,
          })}
          className={`input input-bordered w-full ${error && "input-error"}`}
          type={type}
        />
        {messages.innerRightLabel && (
          <span>
            <FormattedMessage id={messages.innerRightLabel} />
          </span>
        )}
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error h-5">
            {<FormattedMessage id={errorMessages[error.type]} />}
          </span>
        </label>
      )}
    </div>
  );
};
