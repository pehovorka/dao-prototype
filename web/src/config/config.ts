import { Sepolia, type Config } from "@usedapp/core";

const networkConfig = {
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
} as const satisfies Config;

export const config = {
  governorContractAddress: process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS,
  tokenContractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
  timelockContractAddress: process.env.NEXT_PUBLIC_TIMELOCK_ADDRESS,
  treasuryContractAddress: process.env.NEXT_PUBLIC_TREASURY_ADDRESS,
  tokenSymbol: "HOT",
  network: networkConfig,
} as const;
