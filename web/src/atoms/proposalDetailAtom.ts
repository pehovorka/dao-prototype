import { type ProposalCreatedEvent } from "@/hooks";
import { atom } from "jotai";

export const proposalDetailAtom = atom<ProposalCreatedEvent | null>(null);
