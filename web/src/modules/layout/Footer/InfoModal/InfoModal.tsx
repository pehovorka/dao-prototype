import { config } from "@/config";
import { AddressWithAvatar } from "@/modules/common";
import { Title, TitleType } from "@/modules/ui";
import { constants } from "ethers";
import getConfig from "next/config";
import { FormattedMessage } from "react-intl";

const { publicRuntimeConfig } = getConfig();

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}
export const InfoModal = ({ open, onClose }: InfoModalProps) => {
  return (
    <div className={`modal ${open && "modal-open"}`}>
      <div className="modal-box max-w-fit">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
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
                address={contract.address ?? constants.AddressZero}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const contracts = [
  {
    name: "Governor",
    address: config.governorContractAddress,
  },
  {
    name: "Token",
    address: config.tokenContractAddress,
  },
  {
    name: "Timelock",
    address: config.timelockContractAddress,
  },
  {
    name: "Treasury",
    address: config.treasuryContractAddress,
  },
] as const;
