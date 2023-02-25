import { config } from "@/pages/_app";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

export const WrongNetworkModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const { switchNetwork, deactivate, chainId } = useEthers();

  useEffect(() => {
    if (!chainId) return;
    if (config.readOnlyUrls && chainId && !config.readOnlyUrls[chainId]) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [chainId]);
  return (
    <>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={show}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            <FormattedMessage id="profile.wallet.wrongNetworkModal.title" />
          </h3>
          <p className="py-4">
            <FormattedMessage id="profile.wallet.wrongNetworkModal.text" />
          </p>
          <div className="modal-action flex-wrap">
            <button className="btn btn-ghost" onClick={() => deactivate()}>
              <FormattedMessage id="profile.wallet.disconnect" />
            </button>
            <button
              className="btn btn-primary"
              onClick={() => switchNetwork(config.readOnlyChainId ?? 5)}
            >
              <FormattedMessage id="profile.wallet.switchNetwork" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
