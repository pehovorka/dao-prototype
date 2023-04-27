import { useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import { InfoIcon } from "@/assets/icons";
import { config } from "@/config";
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
            {config.tokenSymbol}
          </div>
        </div>
        <progress className={progressClassName} value={percentage}></progress>
      </div>
      {<VotersModal open={modalOpen} handleClose={handleClose} type={type} />}
    </>
  );
};
