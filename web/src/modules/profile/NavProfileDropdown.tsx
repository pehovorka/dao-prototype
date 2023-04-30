import Image from "next/image";
import { shortenAddress, useEthers } from "@usedapp/core";
import { FormattedMessage } from "react-intl";
import Blockies from "react-blockies";

import { NotDelegatedVotesAlert, VotingPower } from "../proposals/common";
import { AddressWithAvatar } from "../common";

export const NavProfileDropdown = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers();

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost gap-3 px-2 flex-nowrap normal-case"
      >
        <div className="hidden sm:block">
          {account ? (
            shortenAddress(account)
          ) : (
            <FormattedMessage id="profile.user.anonymous" />
          )}
        </div>
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
        className="card card-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-72"
      >
        {account && (
          <>
            <div className="stats sm:hidden">
              <div className="stat p-4">
                <div className="stat-title">
                  <FormattedMessage id="profile.wallet.address" />
                </div>
                <div className="text-xl font-bold">
                  <AddressWithAvatar
                    address={account}
                    short
                    copyable
                    noAvatar
                  />
                </div>
              </div>
            </div>
            <VotingPower />
            <NotDelegatedVotesAlert />
            <div className="divider m-0"></div>
          </>
        )}

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
