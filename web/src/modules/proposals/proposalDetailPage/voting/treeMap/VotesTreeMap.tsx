import Blockies from "react-blockies";
import { type DefaultTreeMapDatum, ResponsiveTreeMap } from "@nivo/treemap";
import { FormattedMessage, useIntl } from "react-intl";
import { constants } from "ethers";
import { shortenIfAddress } from "@usedapp/core";
import { useAtomValue } from "jotai";

import { proposalDetailAtom } from "@/atoms";
import {
  useProposalVotes,
  useVoteCastEvents,
  type ProposalCreatedEvent,
} from "@/modules/proposals/hooks";
import { formatEther } from "ethers/lib/utils";
import { Skeleton, Title, TitleType } from "@/modules/ui";
import { filterVotesByType } from "@/modules/proposals/utils";

type NodeType = "forVotes" | "againstVotes" | "abstainVotes" | "notVoted";

interface ChartData extends DefaultTreeMapDatum {
  loc?: number;
  type?: NodeType;
  name?: string;
  children?: ChartData[];
}

export const VotesTreeMap = () => {
  const { formatNumber } = useIntl();
  const proposal = useAtomValue(proposalDetailAtom) as ProposalCreatedEvent;
  const { votes, supply } = useProposalVotes(
    proposal.data.startBlock.toNumber(),
    proposal.data.proposalId
  );
  const { events } = useVoteCastEvents(proposal.data.proposalId);

  if (!events || !votes || !supply) {
    return <Skeleton type="TEXT" />;
  }

  const forVotes = filterVotesByType(events, "for");
  const againstVotes = filterVotesByType(events, "against");
  const abstainVotes = filterVotesByType(events, "abstain");

  const data: ChartData = {
    id: "supply",
    name: "supply",
    children: [
      ...forVotes.map((event) => {
        return {
          id: event.data.voter,
          name: event.data.voter,
          type: "forVotes" as const,
          loc: Number(formatEther(event.data.weight)),
        };
      }),
      ...againstVotes.map((event) => {
        return {
          id: event.data.voter,
          name: event.data.voter,
          type: "againstVotes" as const,
          loc: Number(formatEther(event.data.weight)),
        };
      }),
      ...abstainVotes.map((event) => {
        return {
          id: event.data.voter,
          name: event.data.voter,
          type: "abstainVotes" as const,
          loc: Number(formatEther(event.data.weight)),
        };
      }),
      {
        id: "notVoted",
        name: "notVoted",
        loc: supply - Number(formatEther(votes.totalVotes ?? 0)),
        type: "notVoted",
      },
    ],
  };

  return (
    <section>
      <Title type={TitleType.H2}>
        <FormattedMessage id="proposal.voting.treeMap.title" />
      </Title>
      <div className="h-80 my-8">
        <ResponsiveTreeMap
          data={data as ChartData}
          identity="name"
          value="loc"
          valueFormat=">-.2f"
          label={(node) => `${formatNumber(node.value ?? 0)} HOT`}
          labelSkipSize={1}
          nodeOpacity={1}
          enableParentLabel={false}
          borderWidth={2}
          tooltip={({ node }) => (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {node.data.type === "notVoted" ? (
                  <span className="text-base font-bold">
                    <FormattedMessage id="proposal.voting.treeMap.unusedVotes" />
                  </span>
                ) : (
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 mask mask-squircle">
                      <Blockies
                        seed={node.data.name ?? constants.AddressZero}
                        size={10}
                        scale={2.4}
                      />
                    </div>
                    <p>
                      <span className="text-base font-bold">
                        {shortenIfAddress(node.data.name)}
                      </span>
                    </p>
                  </div>
                )}
                <p>
                  <span className="text-base">
                    {formatNumber(node.value)} HOT
                  </span>
                </p>
              </div>
            </div>
          )}
          colors={({ data }) => {
            switch (data.type) {
              case "forVotes":
                return "hsl(var(--su))";
              case "againstVotes":
                return "hsl(var(--er))";
              case "abstainVotes":
                return "hsl(var(--in))";
              case "notVoted":
                return "hsl(var(--b1))";
              default:
                return "hsl(var(--b3))";
            }
          }}
        />
      </div>
    </section>
  );
};
