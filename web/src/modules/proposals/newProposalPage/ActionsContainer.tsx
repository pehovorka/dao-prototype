import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { FormData } from "./Form";
import { TransferFundsActionContainer } from "./TransferFundsActionContainer";

interface ActionsContainerProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData> | undefined;
}

export const ActionsContainer = ({
  register,
  errors,
}: ActionsContainerProps) => {
  const [enabled, setEnabled] = useState(false);
  const [tab, setTab] = useState<"transferEth" | "custom">("transferEth");

  return (
    <div className={`collapse my-8 ${enabled && "collapse-open"}`}>
      <label className="label cursor-pointer">
        <div className="label label-text text-lg">
          <FormattedMessage id="proposal.new.page.form.actions.title" />
        </div>
        <input
          type="checkbox"
          className="toggle toggle-secondary justify-self-end"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
      </label>
      <div className="collapse-content">
        <div className="tabs tabs-boxed">
          <a
            className={`tab transition-all ${
              tab === "transferEth" && "tab-active"
            }`}
            onClick={() => setTab("transferEth")}
          >
            <FormattedMessage id="proposal.new.page.form.actions.action.transfer.title" />
          </a>
          <a
            className={`tab transition-all ${tab === "custom" && "tab-active"}`}
            onClick={() => setTab("custom")}
          >
            <FormattedMessage id="proposal.new.page.form.actions.action.custom.title" />
          </a>
        </div>
        {tab === "transferEth" && (
          <TransferFundsActionContainer register={register} errors={errors} />
        )}
      </div>
    </div>
  );
};
