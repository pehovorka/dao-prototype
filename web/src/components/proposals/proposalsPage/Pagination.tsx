import { FormattedMessage } from "react-intl";

interface PaginationProps {
  page: number;
  handlePrevious: () => void;
  handleNext: () => void;
  totalPages: number;
}
export const Pagination = ({
  page,
  handleNext,
  handlePrevious,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-12">
      <div className="btn-group">
        <button
          className="btn btn-outline btn-secondary"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          «
        </button>
        <div className="btn btn-outline btn-secondary pointer-events-none">
          <FormattedMessage
            id="proposals.list.pagination.page"
            values={{ page }}
          />
        </div>
        <button
          className="btn btn-outline btn-secondary"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};
