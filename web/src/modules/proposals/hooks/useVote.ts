import { governorContract } from "@/consts/governorContract";
import { useContractFunctionFlow } from "./useContractFunctionFlow";

export type Vote = "for" | "against" | "abstain";

export const voteToSupportMap = {
  against: 0,
  for: 1,
  abstain: 2,
} as const;

export const useVote = () => {
  const { send, state, inProgress, setInProgress } = useContractFunctionFlow(
    governorContract,
    "castVote",
    undefined,
    {
      mining: "proposal.voting.vote.state.mining",
      success: "proposal.voting.vote.state.success",
      exception: "proposal.voting.vote.state.exception",
    }
  );

  return { inProgress, setInProgress, castVote: send, state };
};
