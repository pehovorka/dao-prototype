import type { Dispatch, SetStateAction } from "react";
import { VoteModalContent } from "./VoteModalContent";

interface VoteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const VoteModal = ({ open, setOpen }: VoteModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={open}
        readOnly
      />
      <div className="modal">
        <VoteModalContent setOpen={setOpen} />
      </div>
    </>
  );
};
