import { FormattedMessage } from "react-intl";
import { useEscapeKey } from "@/hooks";
import { Modal } from "@/modules/ui";

import { VotersModalTable } from "./VotersModalTable";
import { VoteTypeContainerProps } from "./VoteTypeContainer";

interface VotersModalProps {
  open: boolean;
  handleClose: () => void;
  type: VoteTypeContainerProps["type"];
}
export const VotersModal = ({ open, handleClose, type }: VotersModalProps) => {
  useEscapeKey(handleClose);

  return (
    <Modal open={open} onClose={handleClose}>
      <h3 className="text-2xl font-bold pb-8">
        <FormattedMessage id={`proposal.voting.voters.${type}`} />
      </h3>
      <VotersModalTable type={type} />
      <p className="text-sm mt-4">
        <FormattedMessage id={"proposal.voting.voters.disclaimer"} />
      </p>
    </Modal>
  );
};
