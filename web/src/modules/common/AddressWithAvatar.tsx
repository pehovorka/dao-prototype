import Blockies from "react-blockies";
import { useState } from "react";
import { useIntl } from "react-intl";
import { shortenIfAddress } from "@usedapp/core";

import { CopyIcon, NewTabIcon } from "@/assets/icons";

interface AddressWithAvatarProps {
  address: string;
  short?: boolean;
  copyable?: boolean;
  responsive?: boolean;
  iconClassName?: string;
  openInEtherscan?: boolean;
  noAvatar?: boolean;
}
export const AddressWithAvatar = ({
  address,
  short,
  copyable,
  responsive,
  iconClassName,
  openInEtherscan,
  noAvatar,
}: AddressWithAvatarProps) => {
  const { formatMessage } = useIntl();
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    copyToClipboard(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="flex gap-2 items-center">
      {!noAvatar && (
        <div className="w-6 h-6 mask mask-squircle">
          <Blockies seed={address} size={10} scale={2.4} />
        </div>
      )}

      {responsive ? (
        <>
          <span className="lg:hidden">{shortenIfAddress(address)}</span>
          <span className="hidden lg:inline-block">{address}</span>
        </>
      ) : (
        <span className="break-all">
          {short ? shortenIfAddress(address) : address}
        </span>
      )}

      {copyable && (
        <div
          className="tooltip tooltip-left"
          data-tip={formatMessage({
            id: isCopied
              ? "common.copyToClipboard.copied"
              : "common.copyToClipboard",
          })}
        >
          <button onClick={handleClick}>
            <CopyIcon
              className={
                iconClassName
                  ? iconClassName
                  : "h-5 opacity-60 transition-opacity hover:opacity-100"
              }
            />
          </button>
        </div>
      )}

      {openInEtherscan && (
        <div
          className="tooltip tooltip-left"
          data-tip={formatMessage({
            id: "common.showOnEtherscan",
          })}
        >
          <a
            href={`https://sepolia.etherscan.io/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            <NewTabIcon
              className={
                iconClassName
                  ? iconClassName
                  : "ml-4 h-5 opacity-60 transition-opacity hover:opacity-100"
              }
            />
          </a>
        </div>
      )}
    </div>
  );
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
