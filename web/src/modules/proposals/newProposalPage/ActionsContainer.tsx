import { useState } from "react";
import type { Control } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { FormData } from "./Form";

interface ActionsContainerProps {
  control: Control<FormData>;
}

export const ActionsContainer = ({ control }: ActionsContainerProps) => {
  const [enabled, setEnabled] = useState(false);
  const [tab, setTab] = useState<"sendEth" | "custom">("sendEth");

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
            className={`tab ${tab === "sendEth" && "tab-active"}`}
            onClick={() => setTab("sendEth")}
          >
            <FormattedMessage id="proposal.new.page.form.actions.action.transfer.title" />
          </a>
          <a
            className={`tab ${tab === "custom" && "tab-active"}`}
            onClick={() => setTab("custom")}
          >
            <FormattedMessage id="proposal.new.page.form.actions.action.custom.title" />
          </a>
        </div>
      </div>
    </div>
  );
};
