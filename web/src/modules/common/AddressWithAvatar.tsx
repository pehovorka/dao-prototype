import Blockies from "react-blockies";
import { useState } from "react";
import { useIntl } from "react-intl";
import { shortenIfAddress } from "@usedapp/core";

import { CopyIcon } from "@/assets/icons";

interface AddressWithAvatarProps {
  address: string;
  short?: boolean;
  copyable?: boolean;
}
export const AddressWithAvatar = ({
  address,
  short,
  copyable,
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
      <div className="w-6 h-6 mask mask-squircle">
        <Blockies seed={address} size={10} scale={2.4} />
      </div>

      <span className="break-all">
        {short ? shortenIfAddress(address) : address}
      </span>

      {copyable && (
        <div
          className="tooltip"
          data-tip={formatMessage({
            id: isCopied
              ? "common.copyToClipboard.copied"
              : "common.copyToClipboard",
          })}
        >
          <button onClick={handleClick}>
            <CopyIcon className="ml-4 h-5 opacity-60 transition-opacity hover:opacity-100" />
          </button>
        </div>
      )}
    </div>
  );
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
