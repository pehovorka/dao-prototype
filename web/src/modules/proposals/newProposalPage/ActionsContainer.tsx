import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { CustomActionContainer } from "./CustomActionContainer";
import { FormData } from "./Form";
import { TransferFundsActionContainer } from "./TransferFundsActionContainer";

export const ActionsContainer = () => {
  const { setValue } = useFormContext();
  const [enabled, setEnabled] = useState(false);
  const [tab, setTab] =
    useState<Exclude<FormData["action"], "none">>("transfer");
  useEffect(() => {
    setValue("action", enabled ? tab : "none");
  }, [enabled, tab, setValue]);

  return (
    <div className={`collapse my-8 ${enabled && "collapse-open"}`}>
      <label className="label cursor-pointer w-fit gap-4">
        <div className="label label-text text-lg">
          <FormattedMessage id="proposal.new.page.form.actions.title" />
        </div>
        <input
          type="checkbox"
          className="toggle toggle-secondary"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
      </label>
      <div className="collapse-content">
        <div className="tabs tabs-boxed">
          <a
            className={`tab transition-all ${
              tab === "transfer" && "tab-active"
            }`}
            onClick={() => setTab("transfer")}
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
        {enabled && tab === "transfer" && <TransferFundsActionContainer />}

        {enabled && tab === "custom" && <CustomActionContainer />}
      </div>
    </div>
  );
};
