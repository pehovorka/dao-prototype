import { useEthers } from "@usedapp/core";
import type { Dispatch, SetStateAction } from "react";
import { FormattedMessage } from "react-intl";
import { NoWalletCard } from "../common";

interface VoteModalContentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const VoteModalContent = ({ setOpen }: VoteModalContentProps) => {
  const { account, activateBrowserWallet } = useEthers();
  const handleClose = () => {
    setOpen(false);
  };
  if (!account) {
    return (
      <div className="modal-box max-w-5xl p-0">
        <NoWalletCard
          activateBrowserWallet={activateBrowserWallet}
          type="vote"
          handleClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="modal-box max-w-3xl">
      <h3 className="font-bold text-lg">
        <FormattedMessage id="proposal.voting.title" />
      </h3>
      <p className="py-4">
        You have been selected for a chance to get one year of subscription to
        use Wikipedia for free!
      </p>
      <div className="modal-action">
        <button onClick={handleClose} className="btn btn-ghost">
          <FormattedMessage id="proposal.new.page.form.button.cancel" />
        </button>
        <button onClick={() => setOpen(false)} className="btn btn-primary">
          <FormattedMessage id="proposal.voting.vote.button" />
        </button>
      </div>
    </div>
  );
};
