import { useAtomValue } from "jotai";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { formatEther } from "ethers/lib/utils";

import { proposalDetailAtom } from "@/atoms";
import { tokenContract } from "@/consts";
import { AddressWithAvatar } from "@/modules/common";
import { SectionCard, Title, TitleType } from "@/modules/ui";
import { ProposalCreatedEvent } from "../../hooks";
import { EthereumIcon, WalletIcon } from "@/assets/icons";

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
        <div className="stats stats-vertical border-2 border-base-content border-opacity-10 lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-primary">
              <EthereumIcon className="fill-primary h-9 w-9" />
            </div>
            <div className="stat-title">
              <FormattedMessage id="proposal.actions.transfer.amount" />
            </div>
            <div className="stat-value text-primary">
              <FormattedNumber
                value={Number(formatEther(transaction.args[1]))}
              />{" "}
              <FormattedMessage id="proposal.actions.transfer.amount.currency" />
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <WalletIcon className="fill-secondary h-8 w-8" />
            </div>
            <div className="stat-title">
              <FormattedMessage id="proposal.actions.transfer.recipient" />
            </div>
            <div className="stat-value text-secondary text-sm break-all">
              <AddressWithAvatar short copyable address={transaction.args[0]} />
            </div>
          </div>
        </div>
      </SectionCard>
    );
  }

  return null;
};
