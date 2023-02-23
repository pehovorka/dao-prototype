import { BigNumber } from "ethers";
import { useCall } from "@usedapp/core";
import { FormattedMessage } from "react-intl";

import { Alert } from "@/components/ui/Alert";
import { Title, TitleType } from "@/components/ui/Title";
import { govenorContract } from "@/utils/governorContract";
import { VoteTypeContainer } from "./VoteTypeContainer";

interface VotingContainerProps {
  proposalId: BigNumber;
}
export const VotingContainer = ({ proposalId }: VotingContainerProps) => {
  const { value, error } =
    useCall({
      contract: govenorContract,
      method: "proposalVotes",
      args: [proposalId],
    }) ?? {};

  if (error) {
    console.error(error);
    return <Alert message="Error loading voting data" type="error" />; // TODO: i18n
  }

  if (!value)
    return (
      <progress className="progress progress-primary mt-5 h-24"></progress>
    );

  const totalVotes = value.forVotes
    .add(value.againstVotes)
    .add(value.abstainVotes);

  return (
    <section className="pb-10">
      <Title type={TitleType.H2}>
        <FormattedMessage id="proposal.voting.title" />
      </Title>
      <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3">
        <VoteTypeContainer
          totalVotes={totalVotes}
          votes={value.forVotes}
          type="for"
        />
        <VoteTypeContainer
          totalVotes={totalVotes}
          votes={value.againstVotes}
          type="against"
        />
        <VoteTypeContainer
          totalVotes={totalVotes}
          votes={value.abstainVotes}
          type="abstain"
        />
      </div>
    </section>
  );
};
