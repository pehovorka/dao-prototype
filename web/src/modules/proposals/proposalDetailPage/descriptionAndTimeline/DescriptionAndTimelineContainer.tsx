import { Title, TitleType } from "@/modules/ui";
import { FormattedMessage } from "react-intl";
import ReactMarkdown from "react-markdown";
import { Timeline } from "./timeline";

interface DescriptionAndTimelineContainerProps {
  description: string;
}
export const DescriptionAndTimelineContainer = ({
  description,
}: DescriptionAndTimelineContainerProps) => {
  return (
    <div className="grid sm:grid-cols-twoThirds gap-10 my-14">
      <section>
        <Title type={TitleType.H2}>
          <FormattedMessage id="proposal.description.title" />
        </Title>
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
      </section>

      <Timeline />
    </div>
  );
};
