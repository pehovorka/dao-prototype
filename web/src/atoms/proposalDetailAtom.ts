import { type ProposalCreatedEvent } from "@/modules/proposals/hooks";
import { atom } from "jotai";

export const proposalDetailAtom = atom<ProposalCreatedEvent | null>(null);
