# NFT staking example (get fts)


## Introduction

At Mintbase, we value innovation and quality, offering rewards up to $3,000 for the development of new templates. 

Mintbase Templates are grab-and-go solutions to effortlessly launch blockchain activations like Minsta for events and AI minter for branding. These templates allow any developer to deploy functional applications with a single click, thanks to MintbaseJS and Mintbase GraphQL APIs. This bounty tackles a specific community-requested feature so you'll be making direct impact with your work. 

Your submited Mintbase Template should be a user friendly DApp with a seamless end to end user journey. The source code should be easy to brand and include instructions for other developers to use it.

## Overview

To enhance the appeal and utility of collections, creators are constantly on the lookout for innovative ways to deliver engaging content to their token holders. The practice of staking NFTs to earn fungible tokens (such as meme coins or loyalty points) provides an ideal incentive for collectors to retain their assets.

We are in search of a talented team or an enthusiastic individual developer capable of developing a template that empowers creators to leverage their existing NFT collections. This template would enable the addition of a feature allowing the staking of NFTs via a smart contract, in return for fungible tokens. It's crucial that the collection and fungible token system be customizable and user-friendly, facilitating an easy setup process for any creator looking to adopt this functionality.

## Reward

This specific bounty is eligible for a reward of up to 3,000$.

## Functionality

### 1. Smart Contracts
#### A. Customizable NFT Staking Contract
Individual Deployment: Each creator can deploy their version of the staking contract, allowing them to specify which NFT contract(s) are eligible for staking in their ecosystem.
Customizable Parameters: Creators can set their staking terms, such as duration, reward rates, and eligibility criteria specific to their collection.
#### B. Fungible Token Contract
Creator-Specific FTs: Creators deploy their fungible token contracts to issue rewards. This contract should adhere to NEAR's NEP-141 standard, ensuring compatibility and ease of use.

Reward Logic: The staking contract should interact with this contract to distribute rewards based on the predefined logic (e.g., time staked, number of NFTs staked).

### 2. Frontend Interface
Staking Operations: Enable NFT holders to stake, view, and unstake their NFTs, alongside tracking their earned fungible token rewards.
Wallet Integration: Incorporate NEAR wallet connections to facilitate secure transactions directly from the user interface.

### 3. Setup & Deployment

Provide a clear and easy way for someone to deploy their contracts, configure and customize them and deploy the frontend on their own.

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

