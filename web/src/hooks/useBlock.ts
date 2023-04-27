import { useEffect, useState } from "react";
import { providers } from "ethers";
import { config } from "@/config";
import { timestampToDate } from "@/modules/proposals/utils";

export const useBlock = (blockNumber: number | undefined) => {
  const [block, setBlock] = useState<providers.Block>();
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await providers
          .getDefaultProvider(
            config.network.readOnlyUrls[config.network.readOnlyChainId]
          )
          .getBlock(blockNumber ?? 0);
        setBlock(res);

        const dateFromBlock = timestampToDate(res.timestamp);
        if (dateFromBlock) setDate(dateFromBlock);
      } catch (e) {
        console.error(e);
      }
    };
    if (blockNumber) load();
  }, [blockNumber]);

  return { block, date };
};
