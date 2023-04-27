import { useAtomValue } from "jotai";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { utils, constants } from "ethers";

import { proposalDetailAtom } from "@/atoms";
import { AddressWithAvatar } from "@/modules/common";
import { SectionCard, Title, TitleType } from "@/modules/ui";
import { ProposalCreatedEvent } from "../../hooks";
import { EthereumIcon, WalletIcon } from "@/assets/icons";
import { parseTransactionByContractAddress } from "../../utils";

export const ActionsSection = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  if (proposal.data.calldatas[0] === constants.HashZero) {
    return (
      <SectionCard title={<FormattedMessage id="proposal.actions.title" />}>
        <div className="m-auto">
          <FormattedMessage id={`proposal.actions.noActions`} />
        </div>
      </SectionCard>
    );
  }

  const transaction = parseTransactionByContractAddress(
    proposal.data.targets[0],
    proposal.data.calldatas[0]
  );

  if (!transaction) {
    return (
      <SectionCard title={<FormattedMessage id="proposal.actions.title" />}>
        <div className="m-auto">
          <FormattedMessage id={`proposal.actions.cannotParse`} />
        </div>
      </SectionCard>
    );
  }

  if (transaction.name === "sendFunds") {
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
                value={Number(utils.formatEther(transaction.args[0]))}
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
              <AddressWithAvatar short copyable address={transaction.args[1]} />
            </div>
          </div>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title={<FormattedMessage id="proposal.actions.title" />}>
      <Title type={TitleType.H5}>{transaction.signature}</Title>
      <div className="stats stats-vertical border-2 border-base-content border-opacity-10">
        {transaction.functionFragment.inputs.map((input, index) => (
          <div className="stat" key={index}>
            <div className="stat-title">{input.name}</div>
            <div className="stat-value text-primary text-lg">
              {transaction.args[index].toString()}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
