import { FormattedMessage } from "react-intl";
import { VotersModalTable } from "./VotersModalTable";
import { VoteTypeContainerProps } from "./VoteTypeContainer";
import { useEscapeKey } from "@/hooks";

interface VotersModalProps {
  open: boolean;
  handleClose: () => void;
  type: VoteTypeContainerProps["type"];
}
export const VotersModal = ({ open, handleClose, type }: VotersModalProps) => {
  useEscapeKey(handleClose);

  return (
    <>
      <input
        type="checkbox"
        id="voters-modal"
        className="modal-toggle"
        checked={open}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative max-w-5xl">
          <label
            htmlFor="voters-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </label>
          <h3 className="text-2xl font-bold pb-8">
            <FormattedMessage id={`proposal.voting.voters.${type}`} />
          </h3>
          <VotersModalTable type={type} />
          <p className="text-sm mt-4">
            <FormattedMessage id={"proposal.voting.voters.disclaimer"} />
          </p>
        </div>
      </div>
    </>
  );
};
