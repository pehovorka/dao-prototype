import { ethers } from "hardhat";

export async function deploy() {
  const [owner] = await ethers.getSigners();

  // Deploy HomeOwnersToken contract
  const HomeOwnersToken = await ethers.getContractFactory("HomeOwnersToken");
  const homeOwnersToken = await HomeOwnersToken.deploy();

  // Deploy TimelockController contract
  const TimelockController = await ethers.getContractFactory(
    "TimelockController"
  );
  const timelockController = await TimelockController.deploy(
    0,
    [],
    [],
    owner.address
  );

  // Deploy HomeOwnersGovernance contract

  const HomeOwnersGovernance = await ethers.getContractFactory(
    "HomeOwnersGovernance"
  );
  const homeOwnersGovernance = await HomeOwnersGovernance.deploy(
    homeOwnersToken.address,
    timelockController.address,
    25,
    1,
    1500,
    1
  );

  // Deploy Treasury contract
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();

  await treasury.transferOwnership(timelockController.address, {
    from: owner.address,
  });

  // Assign proposer and executor roles to the governance contract
  const proposerRole = await timelockController.PROPOSER_ROLE();
  const executorRole = await timelockController.EXECUTOR_ROLE();

  await timelockController.grantRole(
    proposerRole,
    homeOwnersGovernance.address,
    { from: owner.address }
  );

  await timelockController.grantRole(
    executorRole,
    homeOwnersGovernance.address,
    { from: owner.address }
  );

  return {
    homeOwnersToken,
    timelockController,
    homeOwnersGovernance,
    treasury,
  };
}

/* // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); */
