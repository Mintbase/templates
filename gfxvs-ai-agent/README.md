# GFXvs Node.js API for Bitte AI Plugin

![Licenses](./gfxvs-ai-agent/public/images/gfx.png)

## Introduction

The GFXvs Node.js API for the Bitte AI Plugin is designed to facilitate seamless interactions for users on the GFXvs Art Battle platform. This API enables users to generate AI images based on prompts and upload them to the GFXvs platform, enhancing user engagement and creativity in the art community. By providing an intuitive interface, this API streamlines the process of art creation and submission.

[![Deploy](https://img.shields.io/badge/Deploy-on%20Vercel-blue)](https://vercel.com/new/clone?repository-url=https://github.com/Teckas-Technologies/GFXvs-AI-Agent)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Make%20ART%20upload%20easier%20in%20GFXvs-green)](#)
[![Tools](https://img.shields.io/badge/Tools-axios-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Node.js-blue)](#)

**Author:**

[![Author](https://img.shields.io/badge/Follow-Teckas%20Technologies-blue?style=social&logo=linkedin)](https://www.linkedin.com/company/teckas/) [![Organization](https://img.shields.io/badge/Teckas%20Technologies-blue)](https://teckastechnologies.com/)


## Key Features

- **AI Image Generation:** Users can generate unique images based on provided prompts.
- **Art Uploading:** Seamlessly upload generated art to the GFXvs Art Battle platform.
- **User Guidance:** The assistant provides step-by-step instructions to help users through the image generation and uploading process.

## User Flow

1. **Generate Image:**
   - The assistant prompts the user to provide a **prompt for generating the image**.
   - Once the image is generated, the user is then asked for an **image title**.

2. **Upload Art:**
   - After collecting the image title, the API uploads the generated image to the `/api/artupload` endpoint along with the following details:
     - `colouredArt`: The URL of the generated image.
     - `arttitle`: The title provided by the user.
     - `artistId`: The user's account ID.

3. **Share Your Creation:**
   - After the image is successfully uploaded, the assistant displays a shareable URL formatted as:
     - **Share your creation with friends and community for upvotes, get featured in the daily art battle, and win amazing prizes!** [https://gfxvs.com/?artId={_id}](https://gfxvs.com/?artId={_id})
   - Here, `_id` is replaced with the unique identifier returned from the API response.

## Conclusion

The GFXvs Node.js API for the Bitte AI Plugin enhances the art creation process on the GFXvs platform by allowing users to generate and upload their artwork easily. By leveraging the capabilities of AI and providing a user-friendly interface, this API fosters creativity and community engagement within the art space. We welcome contributions and feedback to continuously improve the user experience.

## Step By Step

To get started with the GFXvs AI Agent, follow these steps:

1. **Clone repository**
```bash
git clone https://github.com/Teckas-Technologies/GFXvs-AI-Agent
cd GFXvs-AI-Agent
```
2. **Install dependencies**
```bash
npm install
npm run start
```
 
## Deployment
Follow these steps to deploy the GFXvs AI Agent on Vercel:
- Create an Account: Sign up for an account on Vercel.
- Connect GitHub: Connect your GitHub account with Vercel.
- Import Repository: Import the GitHub repository of the project.
- Add Environment Variables: While configuring the project, add the necessary environment variables.
- Deploy: Click the deploy button.
- Access Application: Once the deployment is complete, you can access your application.
