import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { mine, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { deploy } from "./utils/deploy";
import type {
  HomeOwnersGovernance,
  HomeOwnersToken,
  TimelockController,
  Treasury,
} from "../typechain-types";
import { formatEther } from "ethers/lib/utils";

const VOTING_PERIOD = 50400;

let homeOwnersToken: HomeOwnersToken;
let timelockController: TimelockController;
let homeOwnersGovernance: HomeOwnersGovernance;
let treasury: Treasury;

beforeEach(async function () {
  const result = await deploy();
  homeOwnersToken = result.homeOwnersToken;
  timelockController = result.timelockController;
  homeOwnersGovernance = result.homeOwnersGovernance;
  treasury = result.treasury;
});

describe("CreateProposal", function () {
  it("Should create a proposal with transfer action and execute it", async function () {
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

    console.log(
      "initial treasury balance",
      formatEther(initialTreasuryBalance)
    );

    console.log(
      "initial funds recipient balance",
      formatEther(initialFundsRecipientBalance)
    );

    const transferCalldata = treasury.interface.encodeFunctionData(
      "sendFunds",
      [amountToTransfer, fundsRecipient.address]
    );

    const description =
      "This is just a test proposal that transfers a few ETH from treasury to fund recipient :)";

    const descriptionHash = ethers.utils.id(description);

    const proposal = await homeOwnersGovernance.propose(
      [treasury.address],
      [0],
      [transferCalldata],
      description
    );
    const proposalReceipt = await proposal.wait(1);
    const proposalId = proposalReceipt.events![0].args!.proposalId;

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      0,
      "proposal state should be 0 (Pending)"
    );

    await mine(100);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      1,
      "proposal state should be 1 (Active)"
    );

    await homeOwnersGovernance.castVote(proposalId, 1);

    assert.equal(await homeOwnersGovernance.state(proposalId), 1),
      "proposal state should still be 1 (Active)";

    await mine(VOTING_PERIOD);

    assert.equal(
      await homeOwnersGovernance.state(proposalId),
      4,
      "proposal state should be 4 (Succeeded)"
    );

    await homeOwnersGovernance.queue(
      [treasury.address],
      [0],
      [transferCalldata],
      descriptionHash
    );

    console.log("proposal queued");

    await homeOwnersGovernance.execute(
      [treasury.address],
      [0],
      [transferCalldata],
      descriptionHash
    );

    console.log("proposal executed");

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

    console.log("final treasury balance", formatEther(finalTreasuryBalance));
    console.log(
      "final funds recipient balance",
      formatEther(finalRecipientBalance)
    );
  });
});
