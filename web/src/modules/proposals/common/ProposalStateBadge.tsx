import { ProposalState } from "@/consts";
import { FormattedMessage } from "react-intl";

interface ProposalStateBadgeProps {
  state: (typeof ProposalState)[number];
}

export const ProposalStateBadge = ({ state }: ProposalStateBadgeProps) => {
  return (
    <div className={`badge badge-md py-3 ${getBadgeColor(state)}`}>
      <FormattedMessage id={`proposal.state.${state}`} />
    </div>
  );
};

const getBadgeColor = (state: ProposalStateBadgeProps["state"]) => {
  switch (state) {
    case "active":
      return "badge-primary";
    case "canceled":
      return "badge-error";
    case "defeated":
      return "badge-error";
    case "succeeded":
      return "badge-success";
    case "queued":
      return "badge-warning";
    case "expired":
      return "badge-error";
    case "executed":
      return "bg-green-700 text-white";
    default:
      return "badge-secondary";
  }
};
