import { Alert, Skeleton } from "@/components/ui";
import {
  type ProposalCreatedEvent,
  usePagination,
  useProposalCreatedEvents,
} from "@/hooks";
import { useIntl } from "react-intl";
import { Pagination } from "./Pagination";
import { ProposalsListItem } from "./ProposalsListItem";

export const ProposalsList = () => {
  const { proposals, error } = useProposalCreatedEvents();
  const { formatMessage } = useIntl();
  const { items, numberOfPages, page, handleNext, handlePrevious } =
    usePagination<ProposalCreatedEvent>(proposals);

  return (
    <>
      {error && (
        <Alert
          type="error"
          message={formatMessage({ id: "proposals.list.error" })}
        />
      )}
      {items.length > 0 ? (
        items.map((proposal) => (
          <ProposalsListItem
            name={proposal.data.description.split("\n")[0].slice(2)}
            proposer={proposal.data.proposer}
            blockNumber={proposal.blockNumber}
            key={proposal.transactionIndex}
            id={proposal.data.proposalId}
          />
        ))
      ) : (
        <>
          {[...Array(3)].map((_, i) => (
            <Skeleton type="TEXT" key={i} />
          ))}
        </>
      )}
      {items.length > 0 && (
        <Pagination
          page={page}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          totalPages={numberOfPages}
        />
      )}
    </>
  );
};
