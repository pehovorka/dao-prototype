import { FormattedMessage } from "react-intl";

export const HasActionBadge = () => {
  return (
    <div className="badge badge-md py-3 badge-info whitespace-nowrap">
      <FormattedMessage id={`proposal.hasAction`} />
    </div>
  );
};
