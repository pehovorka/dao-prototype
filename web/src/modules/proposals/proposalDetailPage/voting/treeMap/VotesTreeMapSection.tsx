import { SectionCard } from "@/modules/ui";
import { FormattedMessage } from "react-intl";
import { VotesTreeMap } from "./VotesTreeMap";

export const VotesTreeMapSection = () => {
  return (
    <SectionCard
      title={<FormattedMessage id="proposal.voting.treeMap.title" />}
    >
      <VotesTreeMap />
    </SectionCard>
  );
};
