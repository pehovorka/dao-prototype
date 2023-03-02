import { FormattedMessage } from "react-intl";
interface VoteRadioButtonProps {
  type: "for" | "against" | "abstain";
}
export const VoteRadioButton = ({ type }: VoteRadioButtonProps) => {
  const underlineColorClassName =
    type === "for"
      ? "peer-checked:decoration-success"
      : type === "against"
      ? "peer-checked:decoration-error"
      : "peer-checked:decoration-info";

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
          className="peer sr-only"
        />
        <div
          className={`m-1 rounded-lg font-bold border-2 opacity-70
          underline decoration-transparent ${borderColorClassName} underline-offset-4 decoration-4 
          border-dashed cursor-pointer p-4 transition-all ${underlineColorClassName} peer-checked:underline 
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
