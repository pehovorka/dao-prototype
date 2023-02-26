import Image from "next/image";
import { shortenAddress, useEthers } from "@usedapp/core";
import { FormattedMessage } from "react-intl";
import Blockies from "react-blockies";

export const NavProfileDropdown = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers();

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost gap-3 px-2 flex-nowrap normal-case"
      >
        {account ? (
          shortenAddress(account)
        ) : (
          <FormattedMessage id="profile.user.anonymous" />
        )}
        <div className="w-10 h-10 mask mask-squircle">
          {account ? (
            <Blockies seed={account} size={10} />
          ) : (
            <Image
              src="/images/user-placeholder.png"
              width={40}
              height={40}
              alt=""
            />
          )}
        </div>
      </label>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
      >
        <ul className="menu">
          <li>
            {account ? (
              <a onClick={() => deactivate()}>
                <FormattedMessage id="profile.wallet.disconnect" />
              </a>
            ) : (
              <a onClick={() => activateBrowserWallet()}>
                <FormattedMessage id="profile.wallet.connect" />
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
