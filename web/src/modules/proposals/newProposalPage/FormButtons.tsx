import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { useVotingPower } from "../hooks";
import { formatEther } from "ethers/lib/utils";
import { config } from "@/config";
import { InfoIcon } from "@/assets/icons";
import { useConfirmDialog } from "@/hooks";
import { Confirm } from "@/modules/ui";

interface FormButtonsProps {
  loading: boolean;
}
export const FormButtons = ({ loading }: FormButtonsProps) => {
  const { formatNumber } = useIntl();
  const { push } = useRouter();
  const { votingPower } = useVotingPower();

  const {
    open: openCancelConfirm,
    isOpen: isOpenCancelConfirm,
    close: closeCancelConfirm,
  } = useConfirmDialog();

  return (
    <>
      <div className="flex justify-between mt-8 gap-4 items-center flex-wrap">
        {votingPower !== undefined ? (
          <div className="flex items-center gap-1.5 text-sm text-base-content">
            <InfoIcon className="fill-info w-5" />
            <FormattedMessage
              id="proposal.new.page.form.votingPower"
              values={{
                votingPower: formatNumber(Number(formatEther(votingPower))),
                token: config.tokenSymbol,
              }}
            />
          </div>
        ) : (
          <div />
        )}
        <div className="flex justify-end gap-4">
          <button
            onClick={openCancelConfirm}
            type="button"
            disabled={loading}
            className={`btn btn-ghost`}
          >
            <FormattedMessage id="proposal.new.page.form.button.cancel" />
          </button>
          <button
            type="submit"
            className={`btn btn-primary ${loading && "loading"}`}
          >
            <FormattedMessage id="proposal.new.page.form.button.create" />
          </button>
        </div>
      </div>
      <Confirm
        open={isOpenCancelConfirm}
        onConfirm={() => push("/proposals")}
        onCancel={closeCancelConfirm}
        title="proposal.new.page.form.cancel.confirm.title"
        text="proposal.new.page.form.cancel.confirm.description"
      />
    </>
  );
};
