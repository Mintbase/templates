# Dynamic Minsta: Badge Evolution for Multi-Event Participation

## Introduction

At Mintbase, we value innovation and quality, offering rewards up to $3,000 for the development of new templates. 

Mintbase Templates are grab-and-go solutions to effortlessly launch blockchain activations like Minsta for events and AI minter for branding. These templates allow any developer to deploy functional applications with a single click, thanks to MintbaseJS and Mintbase GraphQL APIs. This bounty tackles a specific community-requested feature so you'll be making direct impact with your work. 

Your submited Mintbase Template should be a user friendly DApp with a seamless end to end user journey. The source code should be easy to brand and include instructions for other developers to use it.

## Overview

The goal of this bounty is to enhance the Minsta application to support dynamic NFT badges that evolve as users participate in a series of five distinct events within a campaign. The goal is to incentivize full participation across all events, with the NFT badges evolving to signify user engagement, culminating in eligibility for special rewards for those who achieve the final evolution stage.

## Reward

This specific bounty is eligible for a reward of up to 3,000$.

## Functionality

### Campaign and Event Configuration:

Provide the capability for campaign organizers to set up and configure a series of five events through environment variables or a configuration file in their application deployment. This setup should include unique identifiers, event names, and durations.
Integration with Mintbase 

### NFT Contract:

Utilize the existing NFT contract on Mintbase for creating and managing the NFT badges. Ensure the application is configured to interact with this contract for minting and updating NFTs, with a focus on adding metadata that reflects participation in each event.

### Dynamic NFT Evolution Mechanism:

Implement logic to dynamically evolve the NFT badges as users participate in events. This involves updating the NFT's metadata and possibly its visual representation on Mintbase after participation in each event. The evolution stages should be clearly defined, with the final stage representing participation in all five events.

### User Participation Tracking:

Develop a system within the application to track user participation in each event. This could involve checking in users via the app when they mint a photo at an event and recording this activity against their user profile and NFT metadata.

### Evolution Criteria and Rewards:

Define specific criteria for NFT evolution, detailing how participation in each event contributes to the badge's evolution. Outline the rewards for users whose NFTs reach the final evolution stage, emphasizing the benefits of full participation.

### Frontend Interface Enhancements:

Update the Minsta application's user interface to allow users to view the current evolution stage of their NFT badge, upcoming events, and their participation status. This interface should motivate and inform users about their progress and the remaining requirements for the next evolution stage.

### Documentation and Setup Guide:

Provide detailed documentation for campaign organizers on how to deploy their customized version of the application, set up events, and configure integration with the Mintbase NFT contract. Include guidance on managing the campaign and supporting users throughout the event series.
Deliverables
Customized Minsta Application: An enhanced version of the Minsta app with support for dynamic NFT evolution based on event participation.
Smart Contract Integration: Setup and configuration files for integrating with the Mintbase NFT contract.
User Guide: Comprehensive documentation for users on how to participate in events and evolve their NFT badges.
Organizer Guide: Detailed instructions for campaign organizers on deploying the application, configuring events, and managing the campaign.


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