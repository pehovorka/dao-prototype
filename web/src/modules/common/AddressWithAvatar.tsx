import Blockies from "react-blockies";
import { shortenIfAddress } from "@usedapp/core";

interface AddressWithAvatarProps {
  address: string;
  short?: boolean;
}
export const AddressWithAvatar = ({
  address,
  short,
}: AddressWithAvatarProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-6 h-6 mask mask-squircle">
        <Blockies seed={address} size={10} scale={2.4} />
      </div>

      <span className="break-all">
        {short ? shortenIfAddress(address) : address}
      </span>
    </div>
  );
};
