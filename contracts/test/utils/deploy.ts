import { ethers } from "hardhat";

export async function deploy() {
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

  return { homeOwnersToken, timelockController, homeOwnersGovernance };
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
