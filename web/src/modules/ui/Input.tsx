import { HTMLProps } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<FormData extends FieldValues>
  extends HTMLProps<HTMLInputElement> {
  messages: {
    label: string;
    placeholder: string;
    innerLeftLabel?: string;
    innerRightLabel?: string;
  };
  errorMessages: {
    [key in FieldError["type"]]?: string;
  };
  error?: FieldError | undefined;
  register: UseFormRegister<FormData>;
  name: Path<FormData>;
  options?: RegisterOptions;
  noLocalize?: boolean;
}
export const Input = <FormData extends FieldValues>({
  messages,
  errorMessages,
  error,
  register,
  name,
  type = "text",
  options = { required: true },
  ...rest
}: InputProps<FormData>) => {
  return (
    <div>
      <label className="label label-text text-lg">{messages.label}</label>
      <label
        className={
          (messages.innerLeftLabel || messages.innerRightLabel) && "input-group"
        }
      >
        {messages.innerLeftLabel && <span>{messages.innerLeftLabel}</span>}
        <input
          {...rest}
          {...register(name, options)}
          placeholder={messages.placeholder}
          className={`input input-bordered w-full ${error && "input-error"}`}
          type={type}
        />
        {messages.innerRightLabel && <span>{messages.innerRightLabel}</span>}
      </label>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error h-5">
            {errorMessages[error.type]}
          </span>
        </label>
      )}
    </div>
  );
};
