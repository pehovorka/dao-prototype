import { useAtomValue } from "jotai";

import { proposalDetailAtom } from "@/atoms";
import {
  ProposalCreatedEvent,
  useContractFunctionFlow,
  useProposalState,
} from "../../hooks";
/* import { useEthers } from "@usedapp/core"; */
import { Confirm } from "@/modules/ui";
import { useConfirmDialog } from "@/hooks";
import { FormattedMessage } from "react-intl";
import { governorContract, timelockContract } from "@/consts";
import { ethers } from "ethers";
import { useEffect } from "react";

export const ProposalActionButtons = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;
  const { state } = useProposalState(proposal.data.proposalId);
  /*   const { account } = useEthers(); */

  const descriptionHash = ethers.utils.id(proposal.data.description);

  /*   const isUserProposer = proposal.data.proposer === account; */

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

  /*   const {
    isOpen: isCancelConfirmOpen,
    open: openCancelConfirm,
    close: closeCancelConfirm,
  } = useConfirmDialog();


  const {
    send: cancelSend,
    inProgress: cancelFunctionInProgress,
    state: cancelFunctionState,
  } = useContractFunctionFlow(timelockContract, "cancel");

  useEffect(() => {
    if (cancelFunctionState.status === "Success") {
      closeCancelConfirm();
    }
  }, [cancelFunctionState, closeCancelConfirm]);

  const encodedProposalData = ethers.utils.defaultAbiCoder.encode(
    ["uint256"],
    [proposal.data.proposalId]
  );
  const encodedProposalId = ethers.utils.keccak256(encodedProposalData);
 */
  const showQueueButton = state === "succeeded" || queueFunctionInProgress;
  /*   const showCancelButton =
    (isUserProposer && state !== "queued" && state !== "canceled") ||
    queueFunctionInProgress; */

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
      {/*       {showCancelButton && (
        <>
          <button className="btn btn-sm btn-error" onClick={openCancelConfirm}>
            <FormattedMessage id="proposal.actionButtons.cancel.button" />
          </button>
          <Confirm
            open={isCancelConfirmOpen}
            inProgress={cancelFunctionInProgress}
            title="proposal.actionButtons.cancel.confirm.title"
            text="proposal.actionButtons.cancel.confirm.text"
            onConfirm={() => {
              cancelSend(encodedProposalId);
            }}
            onCancel={closeCancelConfirm}
          />
        </>
      )} */}
    </div>
  );
};
