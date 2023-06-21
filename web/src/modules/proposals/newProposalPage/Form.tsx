import { FormProvider, useForm } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import { constants, ethers } from "ethers";

import {
  ActionsContainer,
  FormButtons,
  MarkdownEditor,
  ProposalTitleInput,
} from "@/modules/proposals/newProposalPage";

import { tokenContract, treasuryContract } from "@/consts";
import {
  useProposalThreshold,
  usePropose,
  useVotingPower,
} from "@/modules/proposals/hooks";
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
  const { votingPower } = useVotingPower();
  const proposalThreshold = useProposalThreshold();

  const isEntitledToVote = votingPower?.gte(proposalThreshold ?? 0) ?? false;

  const onSubmit = methods.handleSubmit((data) => {
    setInProgress(true);

    const getCallData = () => {
      if (
        data.action === "transfer" &&
        data.transferAddress &&
        data.transferAmount
      ) {
        return treasuryContract.interface.encodeFunctionData("sendFunds", [
          ethers.utils.parseUnits(data.transferAmount.toString(), "ether"),
          data.transferAddress,
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

      return constants.HashZero;
    };

    const getContractAddress = () => {
      if (data.action === "transfer") {
        return treasuryContract.address;
      }

      if (data.action === "custom" && data.customFunctionName) {
        const [contractName] = data.customFunctionName;
        const contract = contracts.find((c) => c.name === contractName);
        if (contract) {
          return contract.address;
        }
      }

      return tokenContract.address;
    };

    send(
      [getContractAddress()],
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
    <FormProvider {...methods}>
      <section>
        <form onSubmit={onSubmit}>
          <ProposalTitleInput />
          <MarkdownEditor />
          <ActionsContainer />
          <FormButtons
            loading={inProgress}
            isEntitledToVote={isEntitledToVote}
            proposalThreshold={proposalThreshold}
          />
        </form>
      </section>
    </FormProvider>
  );
};
