import { NewTabIcon } from "@/assets/icons";
import { useIntl } from "react-intl";

interface ViewInEtherscanButtonProps {
  transactionHash: string;
}
export const ViewInEtherscanButton = ({
  transactionHash,
}: ViewInEtherscanButtonProps) => {
  const { formatMessage } = useIntl();

  return (
    <div
      className="tooltip tooltip-left z-10"
      data-tip={formatMessage({
        id: "proposal.timeline.openOnEtherscan",
      })}
    >
      <a
        href={`https://goerli.etherscan.io/tx/${transactionHash}`}
        target="_blank"
        rel="noreferrer"
      >
        <NewTabIcon className="fill-primary w-4 h-4 hover:fill-primary-focus" />
      </a>
    </div>
  );
};
