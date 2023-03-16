import { ChainId } from "@usedapp/core";

export const config = {
  chainId: ChainId.Goerli,
  governorContractAddress: process.env.NEXT_PUBLIC_GOVERNOR_CONTRACT_ADDRESS,
  tokenContractAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
  timelockContractAddress: process.env.NEXT_PUBLIC_TIMELOCK_ADDRESS,
  tokenSymbol: "HOT",
} as const;
