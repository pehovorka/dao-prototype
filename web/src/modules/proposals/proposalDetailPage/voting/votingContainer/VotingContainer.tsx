import { FormattedMessage, useIntl } from "react-intl";
import { useAtomValue } from "jotai";

import { Alert, Title, TitleType } from "@/modules/ui";
import { VoteTypeContainer } from "./VoteTypeContainer";
import { VoteModalButton } from "../voteModal";
import { proposalDetailAtom } from "@/atoms";
import {
  type ProposalCreatedEvent,
  useProposalState,
  useHasVoted,
} from "@/modules/proposals/hooks";
import { HasVotedBadge } from "../../../common";
import { useProposalVotes } from "../../../hooks";

export const VotingContainer = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;
  const { formatNumber, formatMessage } = useIntl();

  const { state: proposalState, error: proposalStateError } = useProposalState(
    proposal.data.proposalId
  );
  const { hasVoted } = useHasVoted(proposal.data.proposalId);
  const { isQuorumReached, participationRate, votes } = useProposalVotes(
    proposal.blockNumber,
    proposal.data.proposalId
  );

  if (votes.error) {
    console.error(votes.error);
    return (
      <Alert
        message={formatMessage({ id: "proposal.voting.error" })}
        type="error"
      />
    );
  }

  return (
    <section className="pb-10">
      <div className="flex justify-between items-center mb-6 gap-x-10 flex-wrap min-h-16">
        <Title type={TitleType.H2}>
          <FormattedMessage id="proposal.voting.title" />
        </Title>
        <div className="flex items-center mb-5 gap-5 flex-wrap">
          {isQuorumReached !== undefined && participationRate !== undefined && (
            <span>
              <FormattedMessage
                id={
                  isQuorumReached
                    ? "proposal.voting.quorumReached"
                    : "proposal.voting.quorumNotReached"
                }
                values={{
                  participationRate: formatNumber(participationRate, {
                    style: "percent",
                    maximumFractionDigits: 2,
                  }),
                }}
              />
            </span>
          )}
          {proposalState === "active" && !hasVoted && <VoteModalButton />}
          {hasVoted && (
            <HasVotedBadge
              type="detail"
              proposalId={proposal.data.proposalId}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
        <VoteTypeContainer
          totalVotes={votes.totalVotes}
          votes={votes.forVotes}
          type="for"
        />
        <VoteTypeContainer
          totalVotes={votes.totalVotes}
          votes={votes.againstVotes}
          type="against"
        />
        <VoteTypeContainer
          totalVotes={votes.totalVotes}
          votes={votes.abstainVotes}
          type="abstain"
        />
      </div>
    </section>
  );
};
