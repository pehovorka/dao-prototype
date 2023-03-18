import { useAtomValue } from "jotai";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { formatEther } from "ethers/lib/utils";

import { proposalDetailAtom } from "@/atoms";
import { tokenContract } from "@/consts";
import { AddressWithAvatar } from "@/modules/common";
import { SectionCard, Title, TitleType } from "@/modules/ui";
import { ProposalCreatedEvent } from "../../hooks";

export const ActionsSection = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  if (proposal.data.calldatas[0] === "0x") {
    return (
      <SectionCard title={<FormattedMessage id="proposal.actions.title" />}>
        <div className="m-auto">
          <FormattedMessage id={`proposal.actions.noActions`} />
        </div>
      </SectionCard>
    );
  }

  const transaction = tokenContract.interface.parseTransaction({
    data: proposal.data.calldatas[0],
  });

  if (transaction.name === "transfer") {
    return (
      <SectionCard title={<FormattedMessage id="proposal.actions.title" />}>
        <Title type={TitleType.H5}>
          <FormattedMessage id={`proposal.actions.transfer.title`} />
        </Title>
        <p className="text-2xl font-black">
          <FormattedNumber value={Number(formatEther(transaction.args[1]))} />{" "}
          <FormattedMessage id="proposal.actions.transfer.amount.currency" />
        </p>
        <p className="text-sm uppercase mt-4">
          <FormattedMessage
            id="proposal.actions.transfer.recipient"
            values={{
              address: transaction.args[0],
            }}
          />
        </p>
        <AddressWithAvatar address={transaction.args[0]} />
      </SectionCard>
    );
  }

  return null;
};
