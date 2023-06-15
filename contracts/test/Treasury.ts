import { expect } from "chai";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import type { BigNumber } from "ethers";

import type { Treasury } from "../typechain-types";

import { deploy } from "./utils/deploy";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

let treasuryContract: Treasury;

const sendFundsToTreasury = async function (
  donor: SignerWithAddress,
  amount: number
) {
  const amountToSend = ethers.utils.parseEther(amount.toString());

  const initialDonorBalance = await donor.getBalance();

  const tx = await donor.sendTransaction({
    to: treasuryContract.address,
    value: amountToSend,
  });

  return { tx, initialDonorBalance, amountToSend };
};

describe("treasury", function () {
  beforeEach(async function () {
    const result = await deploy();
    treasuryContract = result.treasury;
  });
  it("should be able to receive funds", async function () {
    const [donor] = await ethers.getSigners();

    const { tx, initialDonorBalance, amountToSend } = await sendFundsToTreasury(
      donor,
      10
    );

    const finalDonorBalance = await donor.getBalance();

    expect(finalDonorBalance).to.equal(
      initialDonorBalance.sub(
        amountToSend.add((tx.gasPrice as BigNumber).mul(tx.gasLimit))
      ),
      "donor balance should be decreased by 10ETH + fees"
    );

    const treasuryBalance = await treasuryContract.provider.getBalance(
      treasuryContract.address
    );

    expect(treasuryBalance).to.equal(
      amountToSend,
      "treasury balance should be increased by 10ETH"
    );
  });

  it("should reject calling sendFunds by non-owner", async function () {
    const [donor, recipient] = await ethers.getSigners();

    const { amountToSend } = await sendFundsToTreasury(donor, 10);

    try {
      await treasuryContract.sendFunds(amountToSend, recipient.address);
    } catch (error: any) {
      expect(error.message).to.contain("Ownable: caller is not the owner");
    }
  });
});
