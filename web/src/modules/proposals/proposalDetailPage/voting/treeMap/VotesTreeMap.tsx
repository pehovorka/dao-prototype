import { type DefaultTreeMapDatum, ResponsiveTreeMap } from "@nivo/treemap";
import { FormattedMessage, useIntl } from "react-intl";
import { constants } from "ethers";
import { useAtomValue } from "jotai";
import { formatEther } from "ethers/lib/utils";

import { proposalDetailAtom } from "@/atoms";
import {
  useProposalVotes,
  useVoteCastEvents,
  type ProposalCreatedEvent,
} from "@/modules/proposals/hooks";
import { Skeleton } from "@/modules/ui";
import { filterVotesByType } from "@/modules/proposals/utils";
import { config } from "@/config";
import { AddressWithAvatar } from "@/modules/common";

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
    <div className="h-96 w-full">
      <ResponsiveTreeMap
        data={data as ChartData}
        identity="name"
        value="loc"
        valueFormat=">-.2f"
        label={(node) =>
          `${formatNumber(node.value ?? 0)} ${config.tokenSymbol}`
        }
        labelSkipSize={1}
        nodeOpacity={1}
        enableParentLabel={false}
        borderWidth={1}
        tooltip={({ node }) => (
          <div className="stats shadow-lg">
            <div className="stat">
              {node.data.type === "notVoted" ? (
                <span className="font-bold">
                  <FormattedMessage id="proposal.voting.treeMap.unusedVotes" />
                </span>
              ) : (
                <>
                  <span className="font-bold">
                    <AddressWithAvatar
                      short
                      address={node.data.name ?? constants.AddressZero}
                    />
                  </span>
                </>
              )}
              <>
                <span className="stat-value">
                  {formatNumber(node.value)} {config.tokenSymbol}
                </span>
                {node.data.type && node.data.type !== "notVoted" && (
                  <p className="stat-desc">
                    <FormattedMessage
                      id={`proposal.voting.treeMap.${node.data.type}`}
                    />
                  </p>
                )}
              </>
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
        labelTextColor={({ data }) => {
          switch (data.type) {
            case "forVotes":
              return "hsl(var(--suc))";
            case "againstVotes":
              return "hsl(var(--erc))";
            case "abstainVotes":
              return "hsl(var(--inc))";
            case "notVoted":
              return "hsl(var(--bc))";
            default:
              return "hsl(var(--bc))";
          }
        }}
        borderColor="hsl(var(--pc))"
      />
    </div>
  );
};
