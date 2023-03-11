import type { Block } from "@ethersproject/abstract-provider";

const BLOCK_SECONDS = 12;

export const getFutureBlockDate = (
  createdAtBlockDetails: Block,
  endsAtBlockNumber: number
) => {
  const blocksDifference = endsAtBlockNumber - createdAtBlockDetails.number;
  const secondsDifference = blocksDifference * BLOCK_SECONDS;

  const endsAtTimestamp =
    createdAtBlockDetails?.timestamp &&
    createdAtBlockDetails?.timestamp + secondsDifference;

  if (endsAtTimestamp) return new Date(endsAtTimestamp * 1000);

  return undefined;
};
