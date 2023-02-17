import { ethers } from "hardhat";

// For reference only – the default HardHat deploy script
/* async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(`Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`);
} */

async function main() {
  const [owner] = await ethers.getSigners();

  const HomeOwnersToken = await ethers.getContractFactory("HomeOwnersToken");
  const homeOwnersToken = await HomeOwnersToken.deploy();

  const TimelockController = await ethers.getContractFactory(
    "TimelockController"
  );
  const timelockController = await TimelockController.deploy(
    0,
    [],
    [],
    owner.address
  );

  const HomeOwnersGovernance = await ethers.getContractFactory(
    "HomeOwnersGovernance"
  );
  const homeOwnersGovernance = await HomeOwnersGovernance.deploy(
    homeOwnersToken.address,
    timelockController.address
  );

  const proposerRole = await timelockController.PROPOSER_ROLE();
  const executorRole = await timelockController.EXECUTOR_ROLE();

  await timelockController.grantRole(
    proposerRole,
    homeOwnersGovernance.address
  );
  await timelockController.grantRole(
    executorRole,
    homeOwnersGovernance.address
  );

  console.log(`HomeOwnersToken deployed to ${homeOwnersToken.address}`);
  console.log(`TimeLockController deployed to ${timelockController.address}`);
  console.log(
    `HomeOwnersGovernance deployed to ${homeOwnersGovernance.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
