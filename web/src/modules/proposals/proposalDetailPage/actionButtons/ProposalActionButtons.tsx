import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { ethers } from "ethers";
import { FormattedMessage } from "react-intl";

import { proposalDetailAtom } from "@/atoms";
import {
  ProposalCreatedEvent,
  useContractFunctionFlow,
  useProposalState,
} from "../../hooks";
import { Confirm } from "@/modules/ui";
import { useConfirmDialog } from "@/hooks";
import { governorContract } from "@/consts";

export const ProposalActionButtons = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const { state } = useProposalState(proposal.data.proposalId);

  const descriptionHash = ethers.utils.id(proposal.data.description);

  const {
    isOpen: isQueueConfirmOpen,
    open: openQueueConfirm,
    close: closeQueueConfirm,
  } = useConfirmDialog();

  const {
    send: queueSend,
    inProgress: queueFunctionInProgress,
    state: queueFunctionState,
  } = useContractFunctionFlow(governorContract, "queue");

  useEffect(() => {
    if (queueFunctionState.status === "Success") {
      closeQueueConfirm();
    }
  }, [queueFunctionState, closeQueueConfirm]);

  const {
    isOpen: isExecuteConfirmOpen,
    open: openExecuteConfirm,
    close: closeExecuteConfirm,
  } = useConfirmDialog();

  const {
    send: executeSend,
    inProgress: executeFunctionInProgress,
    state: executeFunctionState,
  } = useContractFunctionFlow(governorContract, "execute");

  useEffect(() => {
    if (executeFunctionState.status === "Success") {
      closeExecuteConfirm();
    }
  }, [executeFunctionState, closeExecuteConfirm]);

  const showQueueButton = state === "succeeded" || queueFunctionInProgress;
  const showExecuteButton = state === "queued" || executeFunctionInProgress;

  return (
    <div className="flex gap-2">
      {showQueueButton && (
        <>
          <button className="btn btn-sm btn-primary" onClick={openQueueConfirm}>
            <FormattedMessage id="proposal.actionButtons.queue.button" />
          </button>
          <Confirm
            open={isQueueConfirmOpen}
            inProgress={queueFunctionInProgress}
            title="proposal.actionButtons.queue.confirm.title"
            text="proposal.actionButtons.queue.confirm.text"
            requireAuth
            onConfirm={() => {
              queueSend(
                proposal.data.targets,
                [0],
                proposal.data.calldatas,
                descriptionHash
              );
            }}
            onCancel={closeQueueConfirm}
          />
        </>
      )}
      {showExecuteButton && (
        <>
          <button className="btn btn-sm btn-error" onClick={openExecuteConfirm}>
            <FormattedMessage id="proposal.actionButtons.execute.button" />
          </button>
          <Confirm
            open={isExecuteConfirmOpen}
            inProgress={executeFunctionInProgress}
            title="proposal.actionButtons.execute.confirm.title"
            text="proposal.actionButtons.execute.confirm.text"
            requireAuth
            onConfirm={() => {
              executeSend(
                proposal.data.targets,
                [0],
                proposal.data.calldatas,
                descriptionHash
              );
            }}
            onCancel={closeExecuteConfirm}
          />
        </>
      )}
    </div>
  );
};
