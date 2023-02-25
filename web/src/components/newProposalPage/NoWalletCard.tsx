import Image from "next/image";
import { FormattedMessage } from "react-intl";
import type { ActivateBrowserWallet } from "@usedapp/core/dist/esm/src/providers";

interface NoWalletCardProps {
  activateBrowserWallet: ActivateBrowserWallet;
}
export const NoWalletCard = ({ activateBrowserWallet }: NoWalletCardProps) => {
  return (
    <div className="card overflow-hidden md:card-side bg-base-100 shadow-xl">
      <figure className="w-full max-h-52 md:w-2/5 md:max-h-80">
        <Image
          src="/images/crypto-wallet.jpg"
          alt="Album"
          width={700}
          height={500}
        />
      </figure>
      <div className="card-body lg:p-14">
        <h2 className="card-title md:text-3xl">
          <FormattedMessage id="profile.wallet.noWalletCard.title" />
        </h2>
        <p>
          <FormattedMessage id="profile.wallet.noWalletCard.text" />
        </p>
        <div className="card-actions justify-end mt-5">
          <button
            onClick={() => activateBrowserWallet()}
            className="btn btn-primary"
          >
            <FormattedMessage id="profile.wallet.connect" />
          </button>
        </div>
      </div>
    </div>
  );
};
