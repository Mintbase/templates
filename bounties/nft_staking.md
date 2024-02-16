# NFT staking example (get fts)

## Overview

To enhance the appeal and utility of collections, creators are constantly on the lookout for innovative ways to deliver engaging content to their token holders. The practice of staking NFTs to earn fungible tokens (such as meme coins or loyalty points) provides an ideal incentive for collectors to retain their assets.

We are in search of a talented team or an enthusiastic individual developer capable of developing a template that empowers creators to leverage their existing NFT collections. This template would enable the addition of a feature allowing the staking of NFTs via a smart contract, in return for fungible tokens. It's crucial that the collection and fungible token system be customizable and user-friendly, facilitating an easy setup process for any creator looking to adopt this functionality.

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

