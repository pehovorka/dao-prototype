import { FormattedMessage } from "react-intl";
import type { Vote } from "@/modules/proposals/hooks";

interface VoteRadioButtonProps {
  type: Vote;
  handleSelect: (type: Vote) => void;
  selectedOption: Vote | undefined;
  disabled: boolean;
}
export const VoteRadioButton = ({
  type,
  handleSelect,
  selectedOption,
  disabled,
}: VoteRadioButtonProps) => {
  const checkedColorClassName =
    type === "for"
      ? "peer-checked:decoration-success peer-checked:bg-success"
      : type === "against"
      ? "peer-checked:decoration-error peer-checked:bg-error"
      : "peer-checked:decoration-info peer-checked:bg-info";

  const borderColorClassName =
    type === "for"
      ? "border-success"
      : type === "against"
      ? "border-error"
      : "border-info";

  return (
    <div className="form-control">
      <label htmlFor={type}>
        <input
          type="radio"
          name="radio"
          id={type}
          value={type}
          className="peer sr-only loading"
          onChange={() => handleSelect(type)}
          checked={type === selectedOption}
          disabled={disabled}
        />
        <div
          className={`m-1 rounded-lg font-bold border-2 opacity-70
          underline decoration-transparent ${borderColorClassName} underline-offset-4 decoration-4 
          border-dashed ${
            !disabled && "cursor-pointer"
          } p-4 transition-all ${checkedColorClassName} peer-checked:bg-opacity-10 peer-checked:underline 
          peer-checked:border-solid peer-checked:opacity-100 hover:opacity-90 hover:decoration-base-300`}
        >
          <span className="text-lg">
            <FormattedMessage id={`proposal.voting.vote.${type}`} />
          </span>
        </div>
      </label>
    </div>
  );
};
