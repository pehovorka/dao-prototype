# A prototype implementation of a Decentralized Autonomous Organization (DAO) on the Ethereum blockchain.

This monorepo consists of two workspaces:

- `contracts` – smart contracts built on top of [OpenZeppelin governance](https://docs.openzeppelin.com/contracts/4.x/api/governance) in Hardhat development environment
- `web` – Next.js website interacting with deployed smart contracts

This project is part of the author's master's thesis. Deployed demo can be found [here](https://dao-prototype.petrhovorka.com/).

## Running the project locally

Before you start, please install all the dependencies by running `yarn` command.

First, you need to deploy the smart contracts to the blockchain. This project is set up to work with [Alechemy](https://www.alchemy.com/) out of the box. Please create `.env` file in the `contracts` directory and provide your Alchemy API key in the `ALCHEMY_API_KEY` variable. In the variable named `OWNER_ACCOUNT_PRIVATE_KEY`, please provide the private key of the account you want to use as the owner of the deployed contracts. You can use provided `.env.example` file for reference. Then, run the following command to deploy the contracts to the Sepolia testnet:

```
yarn workspace contracts hardhat run scripts/deploy.ts --network sepolia
```

After successful deployment, the output of the script should contain the addresses of all the deployed contracts. Please insert these addresses in the `.env.local` file in the `web` directory. Please use the variable names provided in the `.env.local.example` file. Once done, you can start the development server of the web app by executing this command:

```
yarn start
```

🎉 That's all! The web app connected to your freshly deployed smart contracts should be available at [http://localhost:3000](http://localhost:3000).
