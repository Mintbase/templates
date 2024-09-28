# Near Social Node.js API for Bitte AI Plugin

![Licenses](./public/images/near-social.png)

## Introduction

The Near Social Node.js API for the Bitte AI Plugin provides a comprehensive interface for users to interact with the Near Social platform. This API facilitates operations such as setting up user profiles and uploading posts, making it easier for users to engage with the Near Social community. With a focus on seamless integration and user experience, this API utilizes the power of AI to guide users through the process of managing their profiles and content.

[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Teckas-Technologies/NearSocial-AI-Agent)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Make%20NearSocial%20Operations%20Easier-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-near--api--js%2C%20big.js-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Node.js-blue)](#)

**Author:**

[![Author](https://img.shields.io/badge/Follow-Teckas%20Technologies-blue?style=social&logo=linkedin)](https://www.linkedin.com/company/teckas/) [![Organization](https://img.shields.io/badge/Teckas%20Technologies-blue)](https://teckastechnologies.com/)

## Key Features

- **Profile Management:** Users can set up their profiles on the Near Social platform by providing necessary details.
- **Post Creation:** Allows users to create posts with optional images, enhancing content sharing within the community.
- **Guided User Experience:** The AI assistant provides step-by-step guidance to ensure all information is collected accurately and effectively.

## User Flow

1. **Set Up Profile:**
   - Users are prompted to provide the following profile details:
     - `name`
     - `about`
     - `twitter`
     - `github`
     - `telegram`
     - `website`
     - `profileImage`
     - `bannerImage`
     - `tags` (e.g., rust, web, nft, engineer)
   - Once details are collected, the API uploads the information to the `/api/profile` endpoint along with the user's account ID.

2. **Create a Post:**
   - Users can specify `content` for their post, with an option to upload an image.
   - After preparing the content and optional image URL, the API uploads these details to the `/api/post` endpoint along with the user's account ID.

3. **Receive Confirmation:**
   - After successful uploads, the API provides URLs for signing the transactions, which users can use to finalize their profile setup and post creation.

## Conclusion

The Near Social Node.js API for the Bitte AI Plugin simplifies interactions with the Near Social platform, enhancing the user experience by leveraging AI technology for profile management and content creation. By providing a guided interface, this API ensures that users can easily navigate the process of establishing their online presence within the Near community.

## Step By Step

To get started with the Near Social AI Agent, follow these steps:

1. **Clone repository**
```bash
git clone https://github.com/Teckas-Technologies/NearSocial-AI-Agent
cd NearSocial-AI-Agent
```
2. **Install dependencies**
```bash
npm install
npm run start
```

## Usage

 In this template, we used the `near-api-js` for fetch the required information from the near social contract.

## Contracts
```bash
const NEAR_SOCIAL_DB_CONTRACT_ID = 'social.near';
```
 
## Deployment
Follow these steps to deploy the Near Social AI Agent on Vercel:
- Create an Account: Sign up for an account on Vercel.
- Connect GitHub: Connect your GitHub account with Vercel.
- Import Repository: Import the GitHub repository of the project.
- Add Environment Variables: While configuring the project, add the necessary environment variables.
- Deploy: Click the deploy button.
- Access Application: Once the deployment is complete, you can access your application.
