import { useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";

import {
  NoWalletCard,
  FormButtons,
  MarkdownEditor,
  ProposalTitleInput,
} from "@/components/proposals/newProposalPage";

import { tokenContract } from "@/consts/tokenContract";
import { usePropose } from "@/hooks";

export interface FormData {
  title: string;
  description: string;
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { account, activateBrowserWallet } = useEthers();
  const { inProgress, setInProgress, send } = usePropose();

  const onSubmit = handleSubmit((data) => {
    setInProgress(true);
    send(
      [tokenContract.address],
      [0],
      ["0x"],
      `# ${data.title}\n${data.description}`
    );
  });

  if (!account) {
    return (
      <section>
        <NoWalletCard activateBrowserWallet={activateBrowserWallet} />
      </section>
    );
  }

  return (
    <>
      <section>
        <form onSubmit={onSubmit}>
          <ProposalTitleInput register={register} error={errors.title} />
          <MarkdownEditor control={control} />
          <FormButtons loading={inProgress} />
        </form>
      </section>
    </>
  );
};