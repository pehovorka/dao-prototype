import { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { VotersModal } from "./VotersModal";
import type { VoteTypeContainerProps } from "./VoteTypeContainer";

interface VoteTypeContainerCardProps {
  type: VoteTypeContainerProps["type"];
  percentage?: number;
  totalPower?: string;
  progressClassName: string;
}
export const VoteTypeContainerCard = ({
  type,
  percentage,
  totalPower,
  progressClassName,
}: VoteTypeContainerCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="card bg-base-100 shadow-md mb-4 card-compact overflow-hidden cursor-pointer group transition-shadow hover:shadow-lg"
      >
        <div className="card-body flex flex-row justify-between gap-10">
          <div className="min-w-0">
            <h3 className="card-title mt-0">
              <FormattedMessage id={`proposal.voting.${type}`} />
            </h3>
            <p className="mb-0 overflow-ellipsis overflow-hidden">
              {percentage !== undefined ? (
                <FormattedNumber
                  value={percentage}
                  style="percent"
                  maximumFractionDigits={1}
                />
              ) : (
                "..."
              )}
            </p>
          </div>
          <div className="flex items-end flex-col justify-between m-0 p-0">
            <InfoIcon
              className="
            fill-base-content opacity-50 w-7 h-7 -mt-2 -mr-2 transition-all 
            group-hover:opacity-100 group-hover:fill-secondary"
            />
            {totalPower ? (
              <FormattedNumber value={Number(totalPower)} />
            ) : (
              "..."
            )}{" "}
            HOT
          </div>
        </div>
        <progress className={progressClassName} value={percentage}></progress>
      </div>
      {<VotersModal open={modalOpen} handleClose={handleClose} type={type} />}
    </>
  );
};

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    height="48"
    viewBox="0 0 48 48"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M0 0h48v48h-48z" fill="none" />
    <path d="M22 34h4v-12h-4v12zm2-30c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm0 36c-8.82 0-16-7.18-16-16s7.18-16 16-16 16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z" />
  </svg>
);
