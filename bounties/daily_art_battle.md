# Daily Art Battle


## Introduction

At Mintbase, we value innovation and quality, offering rewards up to $3,000 for the development of new templates. 

Mintbase Templates are grab-and-go solutions to effortlessly launch blockchain activations like Minsta for events and AI minter for branding. These templates allow any developer to deploy functional applications with a single click, thanks to MintbaseJS and Mintbase GraphQL APIs. This bounty tackles a specific community-requested feature so you'll be making direct impact with your work. 

Your submited Mintbase Template should be a user friendly DApp with a seamless end to end user journey. The source code should be easy to brand and include instructions for other developers to use it.

## Overview

We are seeking a senior developer to create an innovative Mintbase template that facilitates a daily art battle, leveraging Mintbase technology. This template will automate the process of voting for art pieces, minting NFTs for participants, and incentivizing continuous engagement through a unique reward mechanism. The concept, titled ""Daily Art Battle"" (DAB), pits two pieces of art (A vs B) against each other, with the community voting for their favorite. Winners and participants receive NFT rewards based on the outcome and their participation streak. 

Develop a user-friendly interface that allows participants to easily vote, view upcoming battles, and track their voting streak and rewards. The interface will also allow artists to upload art to be voted into the daily battle slot.

## Reward

This specific bounty is eligible for a reward of up to 2,000$.

## Functionality


### **Voting Mechanism Integration**:
 Implement a secure and transparent voting system where users can vote daily for one of two art pieces (A vs B). Ensure the system is integrated with Mintbase smart contracts for verifiable transactions.
    
### **NFT Minting Logic**:
    
- Automatically mint NFTs in color for all voters who chose the winning piece.
- Mint an animated 1:1  (3d, live2d, shiny, uncensored, glitched, outtake, blooper, process reveal,  behind the scenes, deconstructed, etc) version of the winning piece for one randomly selected winner.
- For the losing piece, mint NFTs in black and white for its voters.

### **Participation Tracking**:
 Develop a system to track consecutive days of voting by each participant. The number of consecutive days should equal the number of entries/tickets a user receives for the daily random selection for special NFTs, regardless of their vote's outcome. One raffle winner gets a special version of the more popular art and one raffle winner gets a special version of the less popular art.
    
### **Content Queue and Curator Interaction**:
 Establish a mechanism for artists to submit their work to a queue for upcoming battles. Include a feature for curators (or the community) to upvote which art pieces should be featured in future battles. When upvoting, the community is only shown the Grayscale versions of artwork A and B. Upvotes can be paid in NEAR or a TBD fungible token. Artists can have as many submissions into the queue as they like, and artists must submit 6 assets to enter into the queue:
        1. Color Artwork A
        2. Color Artwork B
        3. Grayscale Artwork A
        4. Grayscale Artwork B
        5. Animated Artwork A
        6. Animated Artwork B"


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