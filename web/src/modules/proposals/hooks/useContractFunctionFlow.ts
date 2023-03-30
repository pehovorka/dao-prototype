import { useContractFunction } from "@usedapp/core";
import type {
  ContractFunctionNames,
  Falsy,
  TransactionOptions,
  TypedContract,
} from "@usedapp/core/dist/esm/src/model";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MessageDescriptor, useIntl } from "react-intl";

export const useContractFunctionFlow = <
  T extends TypedContract,
  FN extends ContractFunctionNames<T>
>(
  contract: T | Falsy,
  functionName: FN,
  options?: TransactionOptions,
  messages?: {
    mining?: MessageDescriptor["id"];
    success?: MessageDescriptor["id"];
    exception?: MessageDescriptor["id"];
  }
) => {
  const { formatMessage } = useIntl();
  const [inProgress, setInProgress] = useState<boolean>(false);
  const { send, state, events, resetState } = useContractFunction(
    contract,
    functionName,
    options
  );

  useEffect(() => {
    console.log("state", state);
    switch (state.status) {
      case "None":
        toast.dismiss();
        break;
      case "Mining":
        setInProgress(true);
        toast.dismiss();
        toast.loading(
          formatMessage({
            id: messages?.mining ?? "contractFunctionFlow.state.mining",
          }),
          {
            duration: 1000000,
          }
        );
        break;
      case "Success":
        toast.dismiss();
        toast.success(
          formatMessage({
            id: messages?.success ?? "contractFunctionFlow.state.success",
          })
        );
        setInProgress(false);
        break;
      case "Exception":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            {
              id: messages?.exception ?? "contractFunctionFlow.state.exception",
            },
            { error: state.errorMessage }
          )
        );
        break;
      case "Fail":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            {
              id: messages?.exception ?? "contractFunctionFlow.state.exception",
            },
            { error: state.errorMessage }
          )
        );
        break;
      default:
        break;
    }
  }, [
    state,
    formatMessage,
    messages?.exception,
    messages?.mining,
    messages?.success,
  ]);

  return {
    send,
    state,
    events,
    inProgress,
    setInProgress,
    resetState,
  };
};
