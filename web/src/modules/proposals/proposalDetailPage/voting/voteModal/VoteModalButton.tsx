import Image from "next/image";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import { VoteModal } from "./VoteModal";

interface VoteModalButtonProps {
  hidden?: boolean;
}

export const VoteModalButton = ({ hidden }: VoteModalButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      {!hidden && (
        <button className="btn gap-3 btn-primary" onClick={handleClick}>
          <Image src="/icons/vote.svg" alt="" width={16} height={16} />
          <FormattedMessage id="proposal.voting.vote.button" />
        </button>
      )}

      <VoteModal open={open} setOpen={setOpen} />
    </>
  );
};
