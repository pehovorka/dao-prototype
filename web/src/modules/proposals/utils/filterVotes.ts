import { voteToSupportMap, type Vote, type VoteCastEvent } from "../hooks";

export const filterVotesByType = (events: VoteCastEvent[], type: Vote) =>
  events.filter((event) => voteToSupportMap[type] === event.data.support);
