import Image from "next/image";
import { FormattedMessage, type MessageDescriptor } from "react-intl";
import type { ActivateBrowserWallet } from "@usedapp/core/dist/esm/src/providers";

type NoWalletCardProps =
  | {
      activateBrowserWallet: ActivateBrowserWallet;
      type: "create";
      handleClose?: undefined;
    }
  | {
      activateBrowserWallet: ActivateBrowserWallet;
      type: "vote";
      handleClose: () => void;
    }
  | {
      activateBrowserWallet: ActivateBrowserWallet;
      type: "action";
      handleClose: () => void;
    };
export const NoWalletCard = ({
  activateBrowserWallet,
  type,
  handleClose,
}: NoWalletCardProps) => {
  const textMessageId: MessageDescriptor["id"] = `profile.wallet.noWalletCard.${type}.text`;

  return (
    <div className={"card overflow-hidden md:card-side bg-base-100 shadow-xl"}>
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
          <FormattedMessage id={textMessageId} />
        </p>

        <div className="card-actions justify-end mt-5">
          {(type === "vote" || type === "action") && (
            <button onClick={handleClose} className="btn btn-ghost">
              <FormattedMessage id="proposal.new.page.form.button.cancel" />
            </button>
          )}
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
