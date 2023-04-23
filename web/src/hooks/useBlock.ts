import { useEffect, useState } from "react";
import { providers } from "ethers";
import { config } from "@/config";

export const useBlock = (blockNumber: number | undefined) => {
  const [block, setBlock] = useState<providers.Block>();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await providers
          .getDefaultProvider(
            config.network.readOnlyUrls[config.network.readOnlyChainId]
          )
          .getBlock(blockNumber ?? 0);
        setBlock(res);
      } catch (e) {
        console.error(e);
      }
    };
    if (blockNumber) load();
  }, [blockNumber]);

  return block;
};
