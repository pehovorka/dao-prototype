import { useEtherBalance } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { FormattedMessage, type MessageDescriptor, useIntl } from "react-intl";

interface BalanceContainerProps {
  address: string;
  currency: string;
  label: MessageDescriptor["id"];
}
export const BalanceContainer = ({
  address,
  currency,
  label,
}: BalanceContainerProps) => {
  const balance = useEtherBalance(address);
  const { formatNumber } = useIntl();
  return (
    <div className="stats">
      <div className="stat p-4">
        <div className="stat-title">
          <FormattedMessage id={label} />
        </div>
        {balance === undefined && <div className="text-xl font-bold">...</div>}
        {balance !== undefined && (
          <div className="text-xl font-bold">
            {formatNumber(Number(formatEther(balance)))} {currency}
          </div>
        )}
      </div>
    </div>
  );
};
