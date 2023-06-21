import { useBlockNumber, useLogs } from "@usedapp/core";
import { BigNumber } from "ethers";

import { governorContract } from "@/consts";
import type {
  HomeOwnersGovernance,
  ProposalExecutedEventObject,
  ProposalQueuedEventObject,
} from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";
import { useEffect, useState } from "react";
import { DetailedEventRecord } from "@usedapp/core/dist/esm/src/model";
import { config } from "@/config";

interface AllEvents {
  queued:
    | DetailedEventRecord<HomeOwnersGovernance, "ProposalQueued">
    | undefined;
  executed:
    | DetailedEventRecord<HomeOwnersGovernance, "ProposalExecuted">
    | undefined;
}

export const useProposalLifecycleEvents = (
  proposalId: BigNumber,
  fromBlock?: number
) => {
  // Workaround for rerenders caused by useLogs
  // More info here: https://github.com/TrueFiEng/useDApp/pull/1045#issuecomment-1403793564
  const [hasRendered, setHasRendered] = useState(false);
  const [allEvents, setAllEvents] = useState<AllEvents>();
  const blockNumber = useBlockNumber();

  const queuedEvents = useLogs(
    {
      contract: governorContract,
      event: "ProposalQueued",
      args: [],
    },
    { fromBlock, chainId: config.network.readOnlyChainId }
  );

  const executedEvents = useLogs(
    {
      contract: governorContract,
      event: "ProposalExecuted",
      args: [],
    },
    { fromBlock }
  );

  const filteredQueuedEvent = queuedEvents?.value?.find((event) =>
    (event.data as ProposalQueuedEventObject).proposalId.eq(proposalId)
  );

  const filteredExecutedEvent = executedEvents?.value?.find((event) =>
    (event.data as ProposalExecutedEventObject).proposalId.eq(proposalId)
  );

  useEffect(() => {
    if (blockNumber) {
      setHasRendered(false);
    }
  }, [blockNumber]);

  useEffect(() => {
    if (hasRendered || !filteredQueuedEvent || !filteredExecutedEvent) return;

    setAllEvents({
      queued: filteredQueuedEvent,
      executed: filteredExecutedEvent,
    });

    setHasRendered(true);
  }, [hasRendered, filteredQueuedEvent, filteredExecutedEvent]);

  return allEvents;
};
