import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useCall } from "@usedapp/core";
import { FormattedMessage } from "react-intl";
import { useAtomValue } from "jotai";

import { Alert, Title, TitleType } from "@/components/ui";
import { governorContract } from "@/consts/governorContract";
import { VoteTypeContainer } from "./VoteTypeContainer";
import { VoteModalButton } from "../../voteModal";
import { proposalDetailAtom } from "@/atoms";
import { type ProposalCreatedEvent, useProposalState } from "@/hooks";

export const VotingContainer = () => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;

  const { state: proposalState, error: proposalStateError } = useProposalState(
    proposal.data.proposalId
  );
  const { value, error } =
    useCall({
      contract: governorContract,
      method: "proposalVotes",
      args: [proposal.data.proposalId],
    }) ?? {};

  const [totalVotes, setTotalVotes] = useState<BigNumber | undefined>(
    undefined
  );

  useEffect(() => {
    if (!value) return;
    const totalVotes = value.forVotes
      .add(value.againstVotes)
      .add(value.abstainVotes);
    setTotalVotes(totalVotes);
  }, [value]);

  if (error) {
    console.error(error);
    return <Alert message="Error loading voting data" type="error" />; // TODO: i18n
  }

  return (
    <section className="pb-10">
      <div className="flex justify-between items-center mb-6">
        <Title type={TitleType.H2}>
          <FormattedMessage id="proposal.voting.title" />
        </Title>
        {proposalState === "active" && <VoteModalButton />}
      </div>
      <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
        <VoteTypeContainer
          totalVotes={totalVotes}
          votes={value?.forVotes}
          type="for"
        />
        <VoteTypeContainer
          totalVotes={totalVotes}
          votes={value?.againstVotes}
          type="against"
        />
        <VoteTypeContainer
          totalVotes={totalVotes}
          votes={value?.abstainVotes}
          type="abstain"
        />
      </div>
    </section>
  );
};
