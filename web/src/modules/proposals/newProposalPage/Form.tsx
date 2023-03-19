import { useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";

import {
  ActionsContainer,
  FormButtons,
  MarkdownEditor,
  ProposalTitleInput,
} from "@/modules/proposals/newProposalPage";

import { tokenContract } from "@/consts/tokenContract";
import { usePropose } from "@/modules/proposals/hooks";
import { NoWalletCard } from "@/modules/proposals/common";

export interface FormData {
  title: string;
  description: string;
  action: "none" | "transfer" | "custom";
  transferAddress?: string;
  transferAmount?: number;
  customFunction?: [string, string];
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { account, activateBrowserWallet } = useEthers();
  const { inProgress, setInProgress, send } = usePropose();

  const onSubmit = handleSubmit((data) => {
    setInProgress(true);

    const getCallData = () => {
      if (
        data.action === "transfer" &&
        data.transferAddress &&
        data.transferAmount
      ) {
        return tokenContract.interface.encodeFunctionData("transfer", [
          data.transferAddress,
          ethers.utils.parseUnits(data.transferAmount.toString(), "ether"),
        ]);
      }

      return "0x";
    };

    send(
      [tokenContract.address],
      [0],
      [getCallData()],
      `# ${data.title}\n${data.description}`
    );
  });

  if (!account) {
    return (
      <section>
        <NoWalletCard
          type="create"
          activateBrowserWallet={activateBrowserWallet}
        />
      </section>
    );
  }

  return (
    <>
      <section>
        <form onSubmit={onSubmit}>
          <ProposalTitleInput register={register} error={errors.title} />
          <MarkdownEditor control={control} />
          <ActionsContainer
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <FormButtons loading={inProgress} />
        </form>
      </section>
    </>
  );
};
