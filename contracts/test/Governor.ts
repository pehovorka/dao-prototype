import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { mine, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { formatEther } from "ethers/lib/utils";
import { ProposalState } from "web/src/consts/ProposalState";

import { deploy } from "./utils/deploy";
import { createProposal } from "./utils/createProposal";
import type {
  HomeOwnersGovernance,
  HomeOwnersToken,
  Treasury,
} from "../typechain-types";

const VOTING_PERIOD = 50400;

const ProposalStateMap = (state: (typeof ProposalState)[number]) => {
  return ProposalState.indexOf(state);
};

let homeOwnersToken: HomeOwnersToken;
let homeOwnersGovernance: HomeOwnersGovernance;
let treasury: Treasury;

describe("governor", function () {
  beforeEach(async function () {
    const result = await deploy();
    homeOwnersToken = result.homeOwnersToken;
    homeOwnersGovernance = result.homeOwnersGovernance;
    treasury = result.treasury;
  });
  it("should create a proposal with transfer action and execute it", async function () {
    const [voter, fundsRecipient] = await ethers.getSigners();
    const amountToTransfer = ethers.utils.parseEther("5");
    await setBalance(treasury.address, ethers.utils.parseEther("105"));

    mine(100);

    const initialTreasuryBalance = await treasury.provider.getBalance(
      treasury.address
    );

    const initialFundsRecipientBalance = await treasury.provider.getBalance(
      fundsRecipient.address
    );

    await homeOwnersToken.delegate(voter.address);

    const transferCalldata = treasury.interface.encodeFunctionData(
      "sendFunds",
      [amountToTransfer, fundsRecipient.address]
    );

    const { proposalId, descriptionHash } = await createProposal(
      transferCalldata,
      treasury.address,
      homeOwnersGovernance
    );

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      ProposalStateMap("pending"),
      "proposal state should be 0 (Pending)"
    );

    await mine(100);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      ProposalStateMap("active"),
      "proposal state should be 1 (Active)"
    );

    await homeOwnersGovernance.castVote(proposalId, 1);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      ProposalStateMap("active")
    ),
      "proposal state should still be 1 (Active)";

    await mine(VOTING_PERIOD);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      ProposalStateMap("succeeded"),
      "proposal state should be 4 (Succeeded)"
    );

    await homeOwnersGovernance.queue(
      [treasury.address],
      [0],
      [transferCalldata],
      descriptionHash
    );

    await homeOwnersGovernance.execute(
      [treasury.address],
      [0],
      [transferCalldata],
      descriptionHash
    );

    const finalRecipientBalance = await treasury.provider.getBalance(
      fundsRecipient.address
    );

    expect(finalRecipientBalance).to.equal(
      initialFundsRecipientBalance.add(amountToTransfer),
      `funds recipient balance should be increased by ${formatEther(
        amountToTransfer
      )}ETH`
    );

    const finalTreasuryBalance = await treasury.provider.getBalance(
      treasury.address
    );

    expect(finalTreasuryBalance).to.equal(
      initialTreasuryBalance.sub(amountToTransfer),
      `treasury balance should be decreased by ${formatEther(
        amountToTransfer
      )}ETH`
    );
  });

  it("should fail to queue proposal while voting still in progress", async function () {
    const [voter] = await ethers.getSigners();
    await homeOwnersToken.delegate(voter.address);

    const { proposalId, descriptionHash } = await createProposal(
      "0x",
      treasury.address,
      homeOwnersGovernance
    );

    await mine(100);

    await homeOwnersGovernance.castVote(proposalId, 1);

    expect(await homeOwnersGovernance.state(proposalId)).to.equal(
      ProposalStateMap("active"),
      "proposal state should still be 1 (Active)"
    );

    try {
      await homeOwnersGovernance.queue(
        [treasury.address],
        [0],
        ["0x"],
        descriptionHash
      );
    } catch (error: any) {
      expect(error.message).to.contain("Governor: proposal not successful");
    }

    await mine(100);

    expect(await homeOwnersGovernance.state(proposalId)).to.equal(
      ProposalStateMap("active"),
      "proposal state should still be 1 (Active)"
    );
  });

  it("should fail to queue proposal when quorum not reached", async function () {
    const [owner, voter] = await ethers.getSigners();
    const governanceContractAsVoter = homeOwnersGovernance.connect(voter);
    const tokenContractAsVoter = homeOwnersToken.connect(voter);

    // Transfer only one governance token to voter
    const votingPower = ethers.utils.parseUnits("1", "ether");

    homeOwnersToken.approve(owner.address, votingPower);

    await homeOwnersToken.transferFrom(
      owner.address,
      voter.address,
      votingPower
    );

    await mine(100);

    await tokenContractAsVoter.delegate(voter.address);

    await mine(100);

    const { proposalId, descriptionHash } = await createProposal(
      "0x",
      treasury.address,
      governanceContractAsVoter
    );

    await mine(100);

    await governanceContractAsVoter.castVote(proposalId, 1);

    await mine(VOTING_PERIOD);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      ProposalStateMap("defeated"),
      "proposal state should be 3 (Defeated)"
    );

    const votes = await homeOwnersGovernance.proposalVotes(proposalId);

    expect(votes.forVotes).to.equal(votingPower);

    try {
      await homeOwnersGovernance.queue(
        [treasury.address],
        [0],
        ["0x"],
        descriptionHash
      );
    } catch (error: any) {
      expect(error.message).to.contain("Governor: proposal not successful");
    }
  });

  it("should fail to queue proposal when more against votes than for", async function () {
    const [owner, againstVoter, forVoter] = await ethers.getSigners();
    const governanceContractAsAgainstVoter =
      homeOwnersGovernance.connect(againstVoter);
    const governanceContractAsForVoter = homeOwnersGovernance.connect(forVoter);
    const tokenContractAsAgainstVoter = homeOwnersToken.connect(againstVoter);
    const tokenContractAsForVoter = homeOwnersToken.connect(forVoter);

    // Transfer only one governance token to voter
    const forVotingPower = ethers.utils.parseUnits("35", "ether");
    const againstVotingPower = ethers.utils.parseUnits("36", "ether");

    homeOwnersToken.approve(
      owner.address,
      forVotingPower.add(againstVotingPower)
    );

    await homeOwnersToken.transferFrom(
      owner.address,
      forVoter.address,
      forVotingPower
    );

    await homeOwnersToken.transferFrom(
      owner.address,
      againstVoter.address,
      againstVotingPower
    );

    await mine(100);

    await tokenContractAsAgainstVoter.delegate(againstVoter.address);
    await tokenContractAsForVoter.delegate(forVoter.address);

    await mine(100);

    const { proposalId, descriptionHash } = await createProposal(
      "0x",
      treasury.address,
      governanceContractAsForVoter
    );

    await mine(100);

    await governanceContractAsForVoter.castVote(proposalId, 1);
    await governanceContractAsAgainstVoter.castVote(proposalId, 0);

    await mine(VOTING_PERIOD);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      ProposalStateMap("defeated"),
      "proposal state should be 3 (Defeated)"
    );

    const votes = await homeOwnersGovernance.proposalVotes(proposalId);

    expect(votes.forVotes).to.equal(forVotingPower, "for votes should be 35");
    expect(votes.againstVotes).to.equal(
      againstVotingPower,
      "against votes should be 36"
    );

    try {
      await homeOwnersGovernance.queue(
        [treasury.address],
        [0],
        ["0x"],
        descriptionHash
      );
    } catch (error: any) {
      expect(error.message).to.contain("Governor: proposal not successful");
    }
  });
});
