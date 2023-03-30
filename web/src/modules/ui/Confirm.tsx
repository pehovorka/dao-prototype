import { FormattedMessage, MessageDescriptor } from "react-intl";

interface ConfirmProps {
  open: boolean;
  text: MessageDescriptor["id"];
  title: MessageDescriptor["id"];
  confirmText?: MessageDescriptor["id"];
  cancelText?: MessageDescriptor["id"];
  inProgress?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
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
}: ConfirmProps) => {
  return (
    <div className={`modal ${open && "modal-open"}`}>
      <div className="modal-box">
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
