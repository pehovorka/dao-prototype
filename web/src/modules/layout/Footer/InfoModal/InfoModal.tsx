import { FormattedMessage } from "react-intl";
import getConfig from "next/config";
import { constants } from "ethers";

import {
  governorContract,
  timelockContract,
  tokenContract,
  treasuryContract,
} from "@/consts";
import { AddressWithAvatar } from "@/modules/common";
import { ContractParameter } from "@/modules/contracts/ContractParameter";
import { Modal, Title, TitleType } from "@/modules/ui";

const { publicRuntimeConfig } = getConfig();

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}
export const InfoModal = ({ open, onClose }: InfoModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Title type={TitleType.H3}>
        <FormattedMessage id="footer.infoModal.versions.title" />
      </Title>
      <div className="stats stats-vertical border-2 border-base-content w-full border-opacity-10 mb-12 mt-4 md:stats-horizontal">
        <div className="stat">
          <div className="stat-title">
            <FormattedMessage id="common.web" />
          </div>
          <div className="stat-value text-secondary">
            {publicRuntimeConfig?.webVersion}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">
            <FormattedMessage id="common.contracts" />
          </div>
          <div className="stat-value text-secondary">
            {publicRuntimeConfig?.contractsVersion}
          </div>
        </div>
      </div>

      <Title type={TitleType.H3}>
        <FormattedMessage id="common.contracts" />
      </Title>
      <div className="mt-4">
        {contracts.map((contract) => (
          <div key={contract.name} className="mb-6">
            <Title type={TitleType.H4}>{contract.name}</Title>
            <AddressWithAvatar
              copyable
              openInEtherscan
              address={contract.contract.address ?? constants.AddressZero}
            />
          </div>
        ))}
      </div>
      <div className="collapse collapse-arrow bg-base-200 rounded-md mt-8">
        <input type="checkbox" />
        <div className="collapse-title">
          <FormattedMessage id="footer.infoModal.parameters.title" />
        </div>
        <div className="collapse-content">
          <div className="px-4 opacity-85 text-sm">
            {contracts.map((contract) => {
              if (contract.parameters?.length === 0) {
                return null;
              }
              return (
                <div key={contract.name} className="mb-6">
                  <Title type={TitleType.H5}>{contract.name}</Title>
                  {contract.parameters?.map((parameter) => parameter)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const contracts = [
  {
    name: "Governor",
    contract: governorContract,
    parameters: [
      <ContractParameter
        key="votingDelay"
        contract={governorContract}
        method="votingDelay"
        args={[]}
      />,
      <ContractParameter
        key="votingPeriod"
        contract={governorContract}
        method="votingPeriod"
        args={[]}
      />,
      <ContractParameter
        key="proposalThreshold"
        contract={governorContract}
        method="proposalThreshold"
        args={[]}
      />,
      <ContractParameter
        key="quorumNumerator"
        contract={governorContract}
        method="quorumNumerator()"
        args={[]}
      />,
    ],
  },
  {
    name: "Token",
    contract: tokenContract,
    parameters: [
      <ContractParameter
        key="totalSupply"
        contract={tokenContract}
        method="totalSupply"
        args={[]}
      />,
      <ContractParameter
        key="decimals"
        contract={tokenContract}
        method="decimals"
        args={[]}
      />,
      <ContractParameter
        key="symbol"
        contract={tokenContract}
        method="symbol"
        args={[]}
      />,
    ],
  },
  {
    name: "Timelock",
    contract: timelockContract,
    parameters: [],
  },
  {
    name: "Treasury",
    contract: treasuryContract,
    parameters: [
      <ContractParameter
        key="owner"
        contract={treasuryContract}
        method="owner"
        args={[]}
      />,
    ],
  },
] as const;
