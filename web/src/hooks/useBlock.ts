import { useEffect, useState } from "react";
import { providers } from "ethers";
import { config } from "@/config";
import { timestampToDate } from "@/modules/proposals/utils";

export const useBlock = (blockNumber: number | undefined) => {
  const [block, setBlock] = useState<providers.Block>();
  const [date, setDate] = useState<Date>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await providers
          .getDefaultProvider(
            config.network.readOnlyUrls[config.network.readOnlyChainId]
          )
          .getBlock(blockNumber ?? 0);

        if (!res || !res.timestamp) return;

        setBlock(res);

        const dateFromBlock = timestampToDate(res.timestamp);
        if (dateFromBlock) {
          setDate(dateFromBlock);
          setLoaded(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (blockNumber !== undefined && !loaded) load();
  }, [blockNumber, block, loaded]);

  return { block, date };
};
