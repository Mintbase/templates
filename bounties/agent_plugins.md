# Bitte Agent Plugin Bounties

## Introduction

At Bitte, we're revolutionizing blockchain interactions through our AI Wallet on Near Protocol. Our mission is to make any blockchain transaction as easy as chatting with a friend, solving the blockchain UX problem and removing barriers to entry for new users while streamlining complex operations for experienced ones.

Bitte offers rewards for creating and registering innovative Agent Plugins into the Bitte AI Registry. These plugins are crucial in expanding the capabilities of our AI-powered wallet, enabling more efficient and user-friendly blockchain interactions.

## Overview

We are seeking developers to create Agent Plugins for the Bitte AI Registry. These plugins will integrate directly into the Bitte Wallet, enhancing its functionality and providing users with more diverse and powerful blockchain interaction options. The ideal submissions will demonstrate innovation, user-friendliness, and seamless integration with the Bitte ecosystem.

## Reward

Rewards are offered for creating and registering innovative Agent Plugins. Reward amount is broken into 3 tiers based on the complexity and the value added to the Bitte Registry Ecosystem.  Up to $3000 in rewards per Agent Plugin at the highest tier.  A valid plugin is one that adds new funcitonality or extends the functionality of another plugins in a valuable way.

## Functionality

### AI-Powered Wallet
Develop plugins that enhance the wallet's ability to understand and execute natural language commands for blockchain transactions.

### Agent Registry
Create AI Agents that can be used through the Bitte platform, expanding the capabilities of the wallet.

### NFT Integration
Develop plugins that facilitate discovering, creating, and selling NFTs using Mintbase within the Bitte ecosystem.

### Cross-Chain Support
While not immediately available, consider future plugin development for enabling transactions to any EVM chain from a Near account using Near Chain Signatures.

## Submission Guidelines

### How to apply

1. Fork or deploy the [Ref Finance Agent Template](https://templates.bitte.ai/templates/ref-finance-agent-next).
2. Implement your own APIs that fulfill the intents you wish for your agent to handle.
3. Update the OpenAPI Spec to describe how to use your endpoints and their outputs.
4. Extend the spec with the [Bitte Extension](https://docs.mintbase.xyz/ai/assistant-plugins#openapi-bitte-extension) to describe and provide instructions for your AI Agent.
5. Host your Agent Plugin, ensuring external API access from origin https://wallet.bitte.ai.
6. Register your plugin using the [`api/ai-plugins/ref`](https://wallet.bitte.ai/api/ai-plugins/ref) API Reference.

### Deliverables

1. Source Code: Complete source code for the Agent Plugin.
2. OpenAPI Spec: Updated and extended specification describing your plugin's functionality.
3. Deployment: Hosted Agent Plugin accessible from https://wallet.bitte.ai.
4. Registration: Successfully registered plugin using the [`api/ai-plugins/ref`](https://wallet.bitte.ai/api/ai-plugins/ref) API reference.
5. Documentation: Clear instructions on how to use and interact with your Agent Plugin.
6. Demo: A working demo of your plugin in the Bitte playground.

### Evaluation Criteria

- Functionality: The plugin must perform all described functionalities efficiently and securely.
- Innovation: Original and unique contributions are highly valued.
- User Experience: The plugin should offer intuitive interaction within the Bitte Wallet ecosystem.
- Code Quality: Code should be clean, well-documented, and maintainable.
- Integration: Seamless integration with the Bitte Wallet and other relevant systems.
- Security: Implementations must adhere to best practices in smart contract and user data protection.
