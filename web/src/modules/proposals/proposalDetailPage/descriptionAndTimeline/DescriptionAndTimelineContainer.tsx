import ReactMarkdown from "react-markdown";
import { Timeline } from "./timeline";

interface DescriptionAndTimelineContainerProps {
  description: string;
}
export const DescriptionAndTimelineContainer = ({
  description,
}: DescriptionAndTimelineContainerProps) => {
  return (
    <div className="grid sm:grid-cols-twoThirds gap-10">
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

      <Timeline />
    </div>
  );
};
