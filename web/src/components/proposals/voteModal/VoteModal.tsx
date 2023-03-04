import { BigNumber } from "ethers";
import type { Dispatch, SetStateAction } from "react";
import { VoteModalContent } from "./VoteModalContent";

interface VoteModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  proposalId: BigNumber;
  blockNumber: number;
}
export const VoteModal = ({
  open,
  setOpen,
  proposalId,
  blockNumber,
}: VoteModalProps) => {
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
        <VoteModalContent
          setOpen={setOpen}
          proposalId={proposalId}
          blockNumber={blockNumber}
        />
      </div>
    </>
  );
};
