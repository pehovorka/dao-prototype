import { VotesTreeMapSection } from "../voting/treeMap";
import { ActionsSection } from "./ActionsSection";
import DescriptionSection from "./DescriptionSection";
import { TimelineSection } from "./timeline";

interface ProposalDetailContentContainerProps {
  description: string;
}
export const ProposalDetailContentContainer = ({
  description,
}: ProposalDetailContentContainerProps) => {
  return (
    <div className="grid lg:grid-cols-twoThirds gap-10 mb-14">
      <div className="flex flex-col gap-10">
        <DescriptionSection description={description} />
        <ActionsSection />
      </div>

      <div className="grid auto-rows-min gap-10">
        <TimelineSection />
        <VotesTreeMapSection />
      </div>
    </div>
  );
};
