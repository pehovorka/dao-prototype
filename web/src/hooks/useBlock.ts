import { useEffect, useState } from "react";
import { providers } from "ethers";
import { config } from "@/pages/_app";
import { Goerli } from "@usedapp/core";

export const useBlock = (blockNumber: number | undefined) => {
  const [block, setBlock] = useState<providers.Block>();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await providers
          .getDefaultProvider(config.readOnlyUrls![Goerli.chainId] as string)
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
