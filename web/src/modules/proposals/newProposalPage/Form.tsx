import { FormProvider, useForm } from "react-hook-form";
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
import { SolidityDataType } from "@/utils";
import { contracts } from "../consts";

export interface FormData {
  title: string;
  description: string;
  action: "none" | "transfer" | "custom";
  transferAddress?: string;
  transferAmount?: number;
  customFunctionName?: [string, string];
  customFunctionInputs: {
    name: string | number;
    dataType: SolidityDataType;
    value?: string;
  }[];
}

export const Form = () => {
  const methods = useForm<FormData>();
  const { account, activateBrowserWallet } = useEthers();
  const { inProgress, setInProgress, send } = usePropose();

  const onSubmit = methods.handleSubmit((data) => {
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

      if (data.action === "custom" && data.customFunctionName) {
        const [contractName, functionName] = data.customFunctionName;
        const contract = contracts.find((c) => c.name === contractName);
        if (contract) {
          try {
            console.log(data.customFunctionInputs);
            return contract.interface.encodeFunctionData(functionName, [
              ...data.customFunctionInputs.map((input) => input.value),
            ]);
          } catch (e) {
            console.error(e);
          }
        }
      }

      return "0x";
    };

    const callData = getCallData();

    send(
      [tokenContract.address],
      [0],
      [callData],
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
    <FormProvider {...methods}>
      <section>
        <form onSubmit={onSubmit}>
          <ProposalTitleInput />
          <MarkdownEditor />
          <ActionsContainer />
          <FormButtons loading={inProgress} />
        </form>
      </section>
    </FormProvider>
  );
};
