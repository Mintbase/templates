# On-Chain Rewards System for Asset Burning

## Introduction

At Mintbase, we value innovation and quality, offering rewards up to $3,000 for the development of new templates. 

Mintbase Templates are grab-and-go solutions to effortlessly launch blockchain activations like Minsta for events and AI minter for branding. These templates allow any developer to deploy functional applications with a single click, thanks to MintbaseJS and Mintbase GraphQL APIs. This bounty tackles a specific community-requested feature so you'll be making direct impact with your work. 

Your submited Mintbase Template should be a user friendly DApp with a seamless end to end user journey. The source code should be easy to brand and include instructions for other developers to use it.

## Overview
Burning is the act of permanantly destroying digital assets. It enables brands to provide enaging experiences and projects to increase the value of their collections. Burning can also be used for commercial applications like ticketing, loyalty, trials, and coupons.

We're seeking a skilled developer or team to create a decentralized application (DApp) on the NEAR Protocol, facilitating an innovative on-chain rewards system. This DApp will enable users to burn their assets, such as Non-Fungible Tokens (NFTs), in exchange for unique rewards. The mechanics of the burn-to-reward process can be flexible, ranging from direct asset burning with subsequent reward eligibility to more complex interactions involving UI elements and automated background processes.

## Reward

This specific bounty is eligible for a reward of up to 1,000$.

## Functionality

### NFT Collection Integration: 
The DApp will allow NFT collection owners to integrate their existing collections into the platform. This will be achieved through a straightforward configuration process, where the collection owner specifies the smart contract address of their NFT collection.

### Configurable Rewards System:
 Collection owners can configure rewards for burning NFTs from their collection. This could include:

### Direct Rewards:
 Immediate rewards in the form of fungible tokens (FTs), other NFTs, or access to exclusive content/services.
Points System: Accumulation of points for each NFT burned, which can be redeemed for rewards at a later stage.
Tiered Rewards: Different levels of rewards based on the rarity or specific attributes of the burned NFT.
Dynamic Reward Pool Management: An interface for collection owners to manage and update the reward pool. This includes adding new rewards, adjusting reward quantities, and setting expiration dates for redeeming rewards.

### Smart Contract for Asset Burning:
 A secure, auditable smart contract that handles the burning of NFTs and the issuance of rewards. This contract will:

Verify the ownership of the NFT being burned.
Ensure that the NFT belongs to an integrated collection with configured rewards.
Burn the NFT, removing it permanently from circulation.
Issue the corresponding reward to the NFT owner's wallet.

### User Interface for Burning and Rewards:
 A user-friendly interface that allows NFT owners to view eligible rewards, select NFTs for burning, and claim their rewards. This interface will also display detailed transaction histories and the status of claimed rewards.

### Environmental Variables and Configuration:
 Use of environmental variables and configuration files to customize the DApp for different NFT collections and reward schemes. This allows for easy scalability and adaptation to various use cases and collection sizes.

### Automated Background Processes:
 Background services for monitoring the state of the reward pool, processing reward claims, and managing the lifecycle of rewards (e.g., expiration and renewal).

### Community Engagement Tools:
Features to encourage community participation and engagement, such as leaderboards, burning challenges, and social sharing options.


Additional Ideas:

Collaborative Events: Enable collaboration between different NFT collections for special burning events, where burning NFTs from participating collections yields unique, cross-collection rewards.


## Submission Guidelines

### How to apply

Reach out to the Mintbase team and community via Telegram Chat and Github Discussions. Sharing your intention to tackle the bounty is an exciting introductory step. Ask questions about requirements to validate your work, share ideas about functionality for feedback, and provide progress updates to recieve support.

Once your work is complete, submit the full source code and detailed readme as a Pull Request to https://github.com/Mintbase/templates/

### Deliverables

The readme for your PR must follow the convention of other Mintbase Templates so that it's indexed by templates.mintbase.xyz. Be sure to include the following components:

- Source Code: All source code for the DApp, including smart contracts and frontend components.
- Deployment Instructions: Detailed instructions for deploying the DApp and smart contracts.
- User Guide: A comprehensive guide detailing how users can interact with the DApp.
- Demo Video: A short video demonstrating the DApp in action, showcasing key functionalities.
- Example Deployment: Link to the DApp on Testnet is required, Mainnet deployment is optional. 
- Test Cases: Include tests to demonstrate functionality, especially for any new smart contract development.



### Evaluation Criteria

Evaluation of the following criteria will decide on the bounty reward for your Mintbase Template:

- Functionality: The DApp must perform all described functionalities efficiently and securely.
- User Experience: The application should offer a smooth, intuitive user journey from asset selection to reward collection.
- Code Quality: Code should be clean, well-documented, and maintainable.
- Security: Implementations must adhere to best practices in smart contract security and user data protection.
- Originality: The template should feature original code and not be copied from existing sources. Creating something new and unique is highly valued; original contributions take precedence over duplicating existing content with minor modifications.