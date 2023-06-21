import { useEthers } from "@usedapp/core";
import { useAtomValue } from "jotai";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";

import {
  type ProposalCreatedEvent,
  useVote,
  voteToSupportMap,
  type Vote,
} from "@/modules/proposals/hooks";
import { NoWalletCard, VotingPower } from "../../../common";
import { VoteRadioButton } from "./VoteRadioButton";
import { proposalDetailAtom } from "@/atoms";
import { useEscapeKey } from "@/hooks";

interface VoteModalContentProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const VoteModalContent = ({ setOpen }: VoteModalContentProps) => {
  const { account, activateBrowserWallet } = useEthers();
  const [selectedOption, setSelectedOption] = useState<Vote>();
  const { castVote, inProgress, setInProgress, state } = useVote();
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const handleSelect = (vote: Vote) => {
    setSelectedOption(vote);
  };
  const handleVote = () => {
    if (!selectedOption) return;
    setInProgress(true);
    castVote(proposal.data.proposalId, voteToSupportMap[selectedOption]);
  };
  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedOption(undefined);
  }, [setOpen]);

  useEscapeKey(handleClose);

  useEffect(() => {
    if (state.status === "Success") {
      handleClose();
      setSelectedOption(undefined);
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
      <VotingPower blockNumber={proposal.blockNumber} />
      <div className="my-8">
        <VoteRadioButton
          handleSelect={handleSelect}
          selectedOption={selectedOption}
          type="for"
          disabled={inProgress}
        />
        <VoteRadioButton
          handleSelect={handleSelect}
          selectedOption={selectedOption}
          type="against"
          disabled={inProgress}
        />
        <VoteRadioButton
          handleSelect={handleSelect}
          selectedOption={selectedOption}
          type="abstain"
          disabled={inProgress}
        />
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
