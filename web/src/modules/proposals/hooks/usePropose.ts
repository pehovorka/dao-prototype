import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useContractFunction } from "@usedapp/core";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { governorContract } from "@/consts/governorContract";

export const usePropose = () => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { send, state, events } = useContractFunction(
    governorContract,
    "propose"
  );
  const [inProgress, setInProgress] = useState<boolean>(false);

  useEffect(() => {
    console.log("state", state);
    switch (state.status) {
      case "None":
        toast.dismiss();
        break;
      case "Mining":
        toast.dismiss();
        toast.loading(formatMessage({ id: "proposal.new.state.mining" }), {
          duration: 1000000,
        });
        break;
      case "Success":
        toast.dismiss();
        toast.success(formatMessage({ id: "proposal.new.state.success" }));
        break;
      case "Exception":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            { id: "proposal.new.state.exception" },
            { error: state.errorMessage }
          )
        );
        break;
      case "Fail":
        toast.dismiss();
        setInProgress(false);
        toast.error(
          formatMessage(
            { id: "proposal.new.state.exception" },
            { error: state.errorMessage }
          )
        );
        break;
      default:
        break;
    }
  }, [state, formatMessage]);

  useEffect(() => {
    console.log("events", events);
    if (events && events.length > 0) {
      const event = events[0];
      const { args } = event;
      if (args) {
        const data = args[0];
        push(`/proposal/${data}`);
      }
    }
  }, [events, push]);

  return { inProgress, setInProgress, send };
};
