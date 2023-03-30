import { contracts } from "../consts";

export const parseTransactionByContractAddress = (
  contractAddress: string,
  calldata: string
) => {
  const contract = contracts.find(
    (contract) => contract.address === contractAddress
  );
  if (contract) {
    try {
      const transaction = contract.interface.parseTransaction({
        data: calldata,
      });
      return transaction;
    } catch (e) {
      console.log(e);
    }
  }
};
