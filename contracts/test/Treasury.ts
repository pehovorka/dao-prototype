import { expect } from "chai";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type { BigNumber } from "ethers";
import type { Treasury } from "../typechain-types";

import { deploy } from "./utils/deploy";

let treasury: Treasury;

beforeEach(async function () {
  const result = await deploy();
  treasury = result.treasury;
});

describe("Send funds to treasury", function () {
  it("Should send funds to treasury", async function () {
    const [donor] = await ethers.getSigners();
    const amountToSend = ethers.utils.parseEther("10");

    const initialDonorBalance = await donor.getBalance();

    const tx = await donor.sendTransaction({
      to: treasury.address,
      value: amountToSend,
    });

    const finalDonorBalance = await donor.getBalance();

    expect(finalDonorBalance).to.equal(
      initialDonorBalance.sub(
        amountToSend.add((tx.gasPrice as BigNumber).mul(tx.gasLimit))
      ),
      "donor balance should be decreased by 10ETH + fees"
    );

    const treasuryBalance = await treasury.provider.getBalance(
      treasury.address
    );

    expect(treasuryBalance).to.equal(
      amountToSend,
      "treasury balance should be increased by 10ETH"
    );

    console.log(
      "initial donor balance",
      formatEther(initialDonorBalance),
      "final donor balance",
      formatEther(finalDonorBalance)
    );
  });
});
