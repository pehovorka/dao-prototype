import { useEffect } from "react";
import { useRouter } from "next/router";

import { governorContract } from "@/consts/governorContract";
import { useContractFunctionFlow } from "./useContractFunctionFlow";

export const usePropose = () => {
  const { push } = useRouter();

  const { send, events, inProgress, setInProgress } = useContractFunctionFlow(
    governorContract,
    "propose",
    undefined,
    {
      mining: "proposal.new.state.mining",
      success: "proposal.new.state.success",
      exception: "proposal.new.state.exception",
    }
  );

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
