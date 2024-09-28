# PotLock Node.js API for Bitte AI Plugin

![Licenses](./public/images/potlock.png)

## Introduction

The PotLock Node.js API for the Bitte AI Plugin is designed to facilitate seamless interactions for users on the PotLock platform, enabling them to manage fundraising projects and donations efficiently. Built on the NEAR blockchain, this API offers a robust backend that supports the creation of projects, management of donations, and user interactions through an AI-powered interface.

[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Teckas-Technologies/PotLock-AI-Agent)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Make%20PotLock%20Operations%20Easier-orange)](#)
[![Tools](https://img.shields.io/badge/Tools-near--api--js%2C%20big.js-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Node.js-blue)](#)

**Author:**

[![Author](https://img.shields.io/badge/Follow-Teckas%20Technologies-blue?style=social&logo=linkedin)](https://www.linkedin.com/company/teckas/) [![Organization](https://img.shields.io/badge/Teckas%20Technologies-blue)](https://teckastechnologies.com/)

## Key Features

- **Project Management:** Users can create new fundraising projects and view existing ones.
- **Donation Processing:** Securely make donations to approved projects and track contributions effortlessly.
- **Profile Handling:** Users can view and manage their project profiles, including donation history.
- **Real-Time Updates:** The API provides real-time feedback and updates for all actions performed, enhancing the user experience.

## User Flow

1. **Fetch Projects:**
   - Users can retrieve a list of all fundraising projects with pagination support.
   - Endpoint: `GET /api/project`
   - Parameters: 
     - `offset` (integer): The starting point for pagination.

2. **Create a New Project:**
   - Users can initiate a new fundraising project by submitting necessary details.
   - Endpoint: `POST /api/project`
   - Request Body:
     - `accountId`: The account ID of the project creator.
     - `name`: The name of the project.
     - `categories`: List of project categories.
     - `description`: Detailed description of the project.
     - `reason`: Reason for the project being a public good.
     - `profileImage`: URL for the project's profile image.
     - `bannerImage`: URL for the project's banner image.

3. **Make a Donation:**
   - Users can make donations to approved projects, specifying the recipient and donation amount.
   - Endpoint: `POST /api/donation`
   - Request Body:
     - `recipientId`: The account ID of the recipient.
     - `amount`: Donation amount in NEAR tokens.
     - `message`: Optional message for the donation.

4. **View Donations:**
   - Users can track donations received by their projects and donations made by them.
   - Endpoints:
     - `GET /api/donation/recipient`: Fetch donations received.
     - `GET /api/donation/donor`: Fetch donations made.

## Conclusion

The PotLock Node.js API for the Bitte AI Plugin serves as a powerful backend solution for the PotLock platform, streamlining the process of project management and donations. By leveraging the capabilities of the NEAR blockchain and providing an AI-powered interface, this API enhances user engagement and promotes a collaborative fundraising environment. We welcome contributions and feedback from the community to continuously improve the PotLock experience.

## Step By Step

To get started with the PotLock AI Agent, follow these steps:

1. **Clone repository**
```bash
git clone https://github.com/Teckas-Technologies/PotLock-AI-Agent
cd PotLock-AI-Agent
```
2. **Install dependencies**
```bash
npm install
npm run start
```

## Usage

 In this template, we used the `near-api-js` for fetch the required information from the potlock contract.

## Contracts
```bash
const POTLOCK_LISTS_CONTRACT_ID = 'lists.potlock.near';
const POTLOCK_DONATE_CONTRACT_ID = 'donate.potlock.near';
const NEAR_SOCIAL_DB_CONTRACT_ID = 'social.near';
const ADD_PROJECT_CONTRACT_ID = 'nearhorizon.near';
```
 
## Deployment
Follow these steps to deploy the PotLock AI Agent on Vercel:
- Create an Account: Sign up for an account on Vercel.
- Connect GitHub: Connect your GitHub account with Vercel.
- Import Repository: Import the GitHub repository of the project.
- Add Environment Variables: While configuring the project, add the necessary environment variables.
- Deploy: Click the deploy button.
- Access Application: Once the deployment is complete, you can access your application.
