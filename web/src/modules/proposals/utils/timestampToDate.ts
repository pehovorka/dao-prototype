export const timestampToDate = (timestamp?: number) => {
  if (!timestamp) {
    return undefined;
  }
  return new Date(timestamp * 1000);
};
