import { Alert, Skeleton } from "@/modules/ui";
import { usePagination } from "@/hooks";
import {
  type ProposalCreatedEvent,
  useProposalCreatedEvents,
} from "@/modules/proposals/hooks";
import { useIntl } from "react-intl";
import { Pagination } from "./Pagination";
import { ProposalsListItem } from "./ProposalsListItem";
import { parseProposalDescription } from "@/utils";

export const ProposalsList = () => {
  const { proposals, error } = useProposalCreatedEvents();
  const { formatMessage } = useIntl();
  const { items, numberOfPages, page, handleNext, handlePrevious } =
    usePagination<ProposalCreatedEvent>(proposals);

  if (error) {
    return (
      <Alert
        type="error"
        message={formatMessage({ id: "proposals.list.error" })}
      />
    );
  }

  if (proposals === undefined) {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <Skeleton type="TEXT" key={i} />
        ))}
      </>
    );
  }

  if (items.length === 0) {
    return (
      <Alert
        type="info"
        message={formatMessage({ id: "proposals.list.empty" })}
      />
    );
  }

  return (
    <>
      {items.map((proposal) => (
        <ProposalsListItem
          name={parseProposalDescription(proposal.data.description).title}
          proposer={proposal.data.proposer}
          blockNumber={proposal.blockNumber}
          key={proposal.transactionIndex}
          id={proposal.data.proposalId}
        />
      ))}
      <Pagination
        page={page}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        totalPages={numberOfPages}
      />
    </>
  );
};
