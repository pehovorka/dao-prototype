import { useEffect, useState } from "react";
import { useBlockNumber, useLogs } from "@usedapp/core";
import type { BigNumber } from "ethers";

import { governorContract } from "@/consts";
import type { VoteCastEventObject } from "contracts/typechain-types/contracts/Governor.sol/HomeOwnersGovernance";

export interface VoteCastEvent {
  data: VoteCastEventObject;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  transactionHash: string;
  removed: boolean;
}

export const useVoteCastEvents = (
  proposalId: BigNumber,
  fromBlock?: number,
  toBlock?: number
) => {
  const [events, setEvents] = useState<VoteCastEvent[] | undefined>(undefined);
  const [error, setError] = useState(undefined);
  const blockNumber = useBlockNumber();

  // Workaround for rerenders caused by useLogs
  // More info here: https://github.com/TrueFiEng/useDApp/pull/1045#issuecomment-1403793564
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (blockNumber) {
      setHasRendered(false);
    }
  }, [blockNumber]);

  const logs = useLogs(
    {
      contract: governorContract,
      event: "VoteCast",
      args: [],
    },
    { fromBlock, toBlock }
  );

  useEffect(() => {
    if (!logs?.value || logs?.error || hasRendered) return;

    const allLogs = logs.value.map((log) => ({
      ...log,
      data: log.data as VoteCastEventObject,
    }));

    const filteredLogs = allLogs.filter((log) =>
      log.data.proposalId.eq(proposalId)
    );

    setEvents(filteredLogs);
    setError(undefined);
    setHasRendered(true);
  }, [logs, proposalId, hasRendered]);

  return { events, error };
};
