import { expect } from "chai";
import hre, { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { deploy } from "./utils/deploy";

describe("CreateProposal", function () {
  it("Should create a proposal", async function () {
    const { homeOwnersToken, timelockController, homeOwnersGovernance } =
      await deploy();

    const [acc1, acc2] = await ethers.getSigners();

    const transferCalldata = homeOwnersToken.interface.encodeFunctionData(
      "transferFrom",
      [acc1.address, acc2.address, ethers.utils.parseEther("1")]
    );

    const description = "This is just a test proposal :)";
    const proposal = await homeOwnersGovernance.propose(
      [homeOwnersToken.address],
      [0],
      [transferCalldata],
      description
    );
  });
});
