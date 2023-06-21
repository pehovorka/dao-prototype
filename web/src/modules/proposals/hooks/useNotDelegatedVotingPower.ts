import { useDelegate } from "./useDelegate";
import { useVotingPower } from "./useVotingPower";

export const useNotDelegatedVotingPower = () => {
  const { isTokenBalanceGreaterThanVotingPower, error } = useVotingPower();
  const { state } = useDelegate();

  if (
    isTokenBalanceGreaterThanVotingPower &&
    !error &&
    state.status !== "Success"
  ) {
    return true;
  }
  return false;
};
