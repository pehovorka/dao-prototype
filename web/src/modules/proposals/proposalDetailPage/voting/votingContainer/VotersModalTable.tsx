import { FormattedMessage, FormattedNumber } from "react-intl";
import { useAtomValue } from "jotai";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

import { proposalDetailAtom } from "@/atoms";
import {
  type ProposalCreatedEvent,
  useVoteCastEvents,
  voteToSupportMap,
} from "@/modules/proposals/hooks";
import type { VoteTypeContainerProps } from "./VoteTypeContainer";
import { AddressWithAvatar, BlockDate } from "@/modules/common";
import { Skeleton } from "@/modules/ui";
import { config } from "@/config";
import { ViewInEtherscanButton } from "@/modules/proposals/common";

interface VotersModalTableProps {
  type: VoteTypeContainerProps["type"];
}

export const VotersModalTable = ({ type }: VotersModalTableProps) => {
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;
  const { events } = useVoteCastEvents(proposal?.data.proposalId);

  if (!events) return <Skeleton type="TEXT" />;

  const filteredEvents = events
    .filter((event) => voteToSupportMap[type] === event.data.support)
    .sort((a, b) => a.blockNumber - b.blockNumber);

  const totalVotingPower = filteredEvents.reduce(
    (acc, event) => acc.add(event.data.weight),
    BigNumber.from(0)
  );

  if (!filteredEvents.length)
    return (
      <div className="text-center h-24 flex items-center justify-center">
        <p className="text-xl">
          <FormattedMessage id="proposal.voting.voters.noVotes" />
        </p>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>
              <FormattedMessage id="proposal.voting.voters.table.address" />
            </th>
            <th>
              <FormattedMessage id="proposal.voting.voters.table.date" />
            </th>
            <th className="text-right">
              <FormattedMessage id="proposal.voting.voters.table.votingPower" />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td className="flex gap-3">
                <div className="lg:hidden">
                  <AddressWithAvatar
                    copyable
                    short
                    address={event.data.voter}
                  />
                </div>
                <div className="hidden lg:inline-block">
                  <AddressWithAvatar
                    copyable
                    address={event.data.voter}
                    iconClassName="h-4 fill-primary transition-opacity hover:fill-primary-focus"
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-2 items-center">
                  <BlockDate blockNumber={event.blockNumber} />
                  <ViewInEtherscanButton
                    transactionHash={event.transactionHash}
                  />
                </div>
              </td>
              <td className="text-right">
                <FormattedNumber
                  value={Number(formatEther(event.data.weight))}
                />{" "}
                {config.tokenSymbol}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th className="text-right">
              <FormattedNumber value={Number(formatEther(totalVotingPower))} />{" "}
              {config.tokenSymbol}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
