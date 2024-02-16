# Daily Art Battle

## Overview

We are seeking a senior developer to create an innovative Mintbase template that facilitates a daily art battle, leveraging Mintbase technology. This template will automate the process of voting for art pieces, minting NFTs for participants, and incentivizing continuous engagement through a unique reward mechanism. The concept, titled ""Daily Art Battle"" (DAB), pits two pieces of art (A vs B) against each other, with the community voting for their favorite. Winners and participants receive NFT rewards based on the outcome and their participation streak. 

Develop a user-friendly interface that allows participants to easily vote, view upcoming battles, and track their voting streak and rewards. The interface will also allow artists to upload art to be voted into the daily battle slot.

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