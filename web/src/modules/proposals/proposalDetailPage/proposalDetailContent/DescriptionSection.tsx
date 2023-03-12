import ReactMarkdown from "react-markdown";
import { SectionCard } from "@/modules/ui";
import { FormattedMessage } from "react-intl";

interface DescriptionSectionProps {
  description: string;
}
const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  return (
    <SectionCard title={<FormattedMessage id="proposal.description.title" />}>
      <ReactMarkdown
        className="prose"
        components={{
          h1: "h2",
          h2: "h3",
          h3: "h4",
        }}
      >
        {description}
      </ReactMarkdown>
    </SectionCard>
  );
};
export default DescriptionSection;
