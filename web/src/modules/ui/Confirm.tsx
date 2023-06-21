import { useEthers } from "@usedapp/core";
import { FormattedMessage, MessageDescriptor } from "react-intl";

import { NoWalletCard } from "../proposals/common";
import { useClickOutside, useEscapeKey } from "@/hooks";
import { useRef } from "react";

interface ConfirmProps {
  open: boolean;
  text: MessageDescriptor["id"];
  title: MessageDescriptor["id"];
  confirmText?: MessageDescriptor["id"];
  cancelText?: MessageDescriptor["id"];
  inProgress?: boolean;
  requireAuth?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}
export const Confirm = ({
  open,
  text,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  inProgress,
  requireAuth,
}: ConfirmProps) => {
  const { account, activateBrowserWallet } = useEthers();
  const ref = useRef<HTMLDivElement>(null);

  useEscapeKey(onCancel);
  useClickOutside(onCancel, ref);

  if (requireAuth && !account) {
    return (
      <div className={`modal ${open && "modal-open"}`}>
        <div className="modal-box max-w-5xl p-0">
          <NoWalletCard
            activateBrowserWallet={activateBrowserWallet}
            type="action"
            handleClose={onCancel}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`modal ${open && "modal-open"}`}>
      <div className="modal-box" ref={ref}>
        <h3 className="font-bold text-lg">
          <FormattedMessage id={title} />
        </h3>
        <p className="py-4">
          <FormattedMessage id={text} />
        </p>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            disabled={inProgress}
            onClick={onCancel}
          >
            <FormattedMessage id={cancelText ?? "common.cancel"} />
          </button>
          <button
            className={`btn ${inProgress && "loading"}`}
            onClick={onConfirm}
          >
            <FormattedMessage id={confirmText ?? "common.confirm"} />
          </button>
        </div>
      </div>
    </div>
  );
};
