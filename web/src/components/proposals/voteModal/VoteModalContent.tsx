import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";

import { useVote, voteToSupportMap, type Vote } from "@/hooks";
import { NoWalletCard } from "../common";
import { VoteRadioButton } from "./VoteRadioButton";

interface VoteModalContentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  proposalId: BigNumber;
}
export const VoteModalContent = ({
  setOpen,
  proposalId,
}: VoteModalContentProps) => {
  const { account, activateBrowserWallet } = useEthers();
  const [selectedOption, setSelectedOption] = useState<Vote>();
  const { castVote, inProgress, setInProgress, state } = useVote();

  const handleSelect = (vote: Vote) => {
    setSelectedOption(vote);
  };
  const handleVote = () => {
    if (!selectedOption) return;
    setInProgress(true);
    castVote(proposalId, voteToSupportMap[selectedOption]);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (state.status === "Success") {
      handleClose();
    }
  }, [state.status, handleClose]);

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
    <div className="modal-box">
      <h3 className="font-bold text-lg">
        <FormattedMessage id="proposal.voting.title" />
      </h3>
      <div className="my-8">
        <VoteRadioButton handleSelect={handleSelect} type="for" />
        <VoteRadioButton handleSelect={handleSelect} type="against" />
        <VoteRadioButton handleSelect={handleSelect} type="abstain" />
      </div>
      <div className="modal-action">
        <button
          onClick={handleClose}
          disabled={inProgress}
          className="btn btn-ghost"
        >
          <FormattedMessage id="proposal.new.page.form.button.cancel" />
        </button>
        <button
          onClick={handleVote}
          disabled={!selectedOption || inProgress}
          className={`btn btn-primary ${inProgress && "loading"}`}
        >
          <FormattedMessage id="proposal.voting.vote.button" />
        </button>
      </div>
    </div>
  );
};
