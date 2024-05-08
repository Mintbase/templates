# WooNFT


[![Website](https://woonft.art/wp-content/uploads/2024/04/woonft-art-hero.png)](https://woonft.art)

## Description

WooCommerce plugin enabling merchants to offer products as unique NFT variants on NEAR. Art is generated on the fly using AI, and barrier of entry is lowered through chain abstraction via Mintbase. 

This project introduces an easy to use WooCommerce plugin that empowers customers to mint NFTs on Mintbase corresponding to the products of their choice. By absorbing all associated costs and fees, the initiative aims to merge the realms of e-commerce and digital assets, providing tangible value through digital ownership. 

Check out the video bellow:

[![View the video](https://img.youtube.com/vi/RwVIi6312t4/0.jpg)](https://www.youtube.com/watch?v=RwVIi6312t4)


[![Website](https://img.shields.io/badge/Website-Visit-brightgreen)](https://woonft.art)
[![Demo Store](https://img.shields.io/badge/Demo_Store-Visit-brightgreen)](https://woonft.art/shop/)
[![Gallery](https://img.shields.io/badge/NFT_Gallery-Visit-brightgreen)](https://woonfts.yoshi.tech)

[![Deploy API](https://img.shields.io/badge/Deploy_API-Deploy%20Now-blue)](https://vercel.com/new/clone?repository-url=https://github.com/ivanciric/woo-api/)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-{eCommerce,Minter}-blue)](#)
[![Tools](https://img.shields.io/badge/Mintbase,Wordpress,Arweave-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Node.js,Wordpress-blue)](#)


## Walkthrough

The project is structured into three core components:

**WooCommerce Plugin:** Serves as the backbone, integrating directly with the WooCommerce platform. It augments product listings with a “Claim a free NFT” option, enabling customers to initiate the NFT minting process for any product they have purchased.

**Serverless/Edge Functions API:** Facilitates the dynamic creation and minting of NFTs. It includes functions for image generation using OpenAI’s API, image processing and resizing, and communication with blockchain technologies for NFT creation. This API acts as the intermediary between the WooCommerce plugin and Mintbase tech, ensuring efficiency and scalability.

**Mintbase store/contract:** Functions as a digital gallery, showcasing the NFTs minted through the plugin, providing a visual and interactive platform for users to view and appreciate their NFTs. This is a simple Minsta clone.

### User Flow

**Initiation:**
Customers are allowed to mint an NFT for a product they bought by clicking the “Claim a free NFT” button on the checkout complete (’thank you’) page.

**Image Generation:** 
A unique digital piece of art is created, based on the actual product. Alternatively, default product image is used.

**Minting Process:** 
Customer is taken to the Mintbase wallet creation page, where he can get a cryptocurrency wallet seamlessly. He’s then guided through the transaction signing process, and their NFT is minted.

**Finalisation:**
Customer is redirected back to the store ‘thank you’ page, and a congratulatory message is displayed along with a link to Mintbase, where customers can view their newly minted NFTs.

### Usage

Head over to the [Shop](https://woonft.art/shop/) part of the site and buy something (don’t worry, there’s no actual payment involved).
After checkout, you’ll get a chance to claim the NFTs of the bought items, one per item.

### Conclusion

This plugin bridges the gap between traditional e-commerce and the burgeoning world of NFTs, offering customers a unique value proposition. By seamlessly integrating the minting process into the shopping experience, the project not only enhances product appeal but also introduces customers to the world of digital asset ownership, fostering a new dimension of engagement and value.


## WooCommerce plugin

### **Key Features:**

- **AI-Powered Art Generation**: Transform your products into one-of-a-kind digital masterpieces. Every item is distinct and collectible.
- **Seamless Integration with WooCommerce**: ProductNFT is built to integrate flawlessly with your existing WooCommerce store, allowing for a smooth transition to offering NFT variants of your products.
- **NEAR Protocol Support**: Benefit from the speed, low transaction fees, and eco-friendly blockchain technology of NEAR protocol. ProductNFT leverages NEAR to offer a scalable and sustainable NFT experience.
- **Mintbase Chain Abstraction**: We simplify the blockchain experience through Mintbase, offering a layer of abstraction that lowers the barrier of entry for both merchants and buyers. No need for deep technical knowledge to start selling or collecting NFTs.

### **Benefits for Merchants:**

- **Attract a New Audience**: Tap into the rapidly growing NFT market and attract customers looking for unique digital collectibles.
- **Enhanced Product Value**: By offering your products as NFTs, you add a layer of rarity and exclusivity, potentially increasing their value.
- **Innovative Branding Opportunity**: Position your brand at the forefront of technology and innovation, appealing to tech-savvy consumers.
- **Easy to Use**: With Mintbase chain abstraction, you don't need to be a blockchain expert to leverage the benefits of NFTs in your store.

[See it in action](https://www.youtube.com/watch?v=RwVIi6312t4)


## Serverless/Edge Functions API

WooNFT API is a custom backend service designed to integrate NFT minting capabilities into WooCommerce stores. It leverages the Mintbase API for NFT minting on the NEAR protocol and provides additional functionalities such as image resizing and license verification for domain-based access control.

### Features

- **AI image generation**: Create a unique AI art based on the actual product.
- **NFT Minting**: Allows WooCommerce store owners to mint NFTs corresponding to physical products.
- **Image Resizing**: Dynamically resizes product images before minting them as NFTs to meet platform requirements.
- **License Verification**: Ensures that only authorized domains can mint NFTs, enhancing security and control.
- **Environment Support**: Configurable for both testnet and mainnet, facilitating development, testing, and production deployments.

### Setup

To set up the WooNFT API in your environment, follow these steps:

1. **Deploy a Mintbase contract**

If it's your first time deploying a smart contract you may want to switch over to testnet so you can get the hang of things without paying any fees.

***Deploy the contract***

Log in to your Mintbase profile and deploy a new contract or choose an existing one. This will be the NFT contract that your Minsta instance mints to.

![Licenses](https://woonft.art/wp-content/uploads/2024/05/mintbase-deploy-contract.png)

***Add a minter***

In your Mintbase contract settings, navigate to the "Minters" tab and add the 0.drop.proxy.mintbase.near contract as a new minter. This lets your app mint on behalf of users.

![Licenses](https://woonft.art/wp-content/uploads/2024/05/mintbase-contract.png)

2. **Clone the Repository**

```bash
git clone https://github.com/ivanciric/woo-api.git
cd woo-api
```

3. **Install dependencies**
```bash
npm install
```
To deploy the WooNFT API with Vercel, you need to install the Vercel CLI globally on your machine. Run the following command:

```bash
npm install -g vercel
```

4. **Configure environment variables**
```bash
Duplicate `.env.example` to `.env` and update it with your Mintbase, NEAR, and Firebase credentials.
```

5. **Start the development server**
```bash
vercel dev
```

Your API is now running and ready to connect your WooCommerce store to the blockchain!

NOTE: Currently, API usage is free when you setup the licence key to `trial`. If you wish to manage licence keys for your API, you can create a Firestore database `licenses` and have your document structure setup like this:

![Licenses](https://woonft.art/wp-content/uploads/2024/05/firestore-licenses.png)



### Usage

To interact with the API, here are some example usages:

#### Get Image

Get image via POST request to `/api/get-image` with the image description.
```bash
curl -X POST 'https://<vercel-deployment-url>/api/get-image' \
-H 'Content-Type: application/json' \
-H 'x-license-key: your-license-key' \
-d '{
  "description": "A detailed description of the NFT image you want to generate."
}'
```

#### Minting NFTs

Send a POST request to `/api/mint` with product details to mint NFTs.
```bash
curl -X POST 'https://<vercel-deployment-url>/api/mint' \
-H 'Content-Type: application/json' \
-H 'x-license-key: your-license-key' \
-d '{
  "imageUrl": "URL_TO_PRODUCT_IMAGE",
  "name": "PRODUCT_NAME",
  "description": "PRODUCT_DESCRIPTION",
  "redirectUrl": "REDIRECT_URL_AFTER_MINTING"
}'
```

#### Verifying License

Verify a license by sending a POST request to `/api/verify-license` with your license key and domain.
```bash
curl -X POST 'https://<vercel-deployment-url>/api/verify-license' \
-H 'Content-Type: application/json' \
-d '{
  "licenseKey": "YOUR_LICENSE_KEY",
  "domain": "YOUR_DOMAIN"
}'
```

### Wordpress plugin setup

If you want to experiment with the plugin and customize it to your own needs/product, you can edit the code directly in your Wordpress installation. 

Download and install the plugin via [![Github](https://img.shields.io/badge/Github-download-blue)](https://github.com/ivanciric/woonft-plugin/raw/9fbd511defc55d06c4bcd4095466a58f917bc72b/productnft.zip)

You will find the code in your Wordpress installation at `/app/public/wp-content/plugins/productnft`

In the `productnft.php` file, change the line 167 `'api_url' => 'https://woonft-api.yoshi.tech/api/'` to your corresponding API url and you're ready to go!

All plugin functionality is contained within `productnft.php` and `js/productnft-button.js` files.


## Deployment 

[![Deploy API](https://img.shields.io/badge/Deploy_API-deploy-blue)](https://vercel.com/new/clone?repository-url=https://github.com/ivanciric/woo-api/)
<sup>(Make sure to adjust the .env variables as shown in the .env.example file)</sup>

[![Wordpress plugin](https://img.shields.io/badge/Wordpress_plugin-download-blue)](https://github.com/ivanciric/woonft-plugin/raw/9fbd511defc55d06c4bcd4095466a58f917bc72b/productnft.zip)


[![Gallery](https://img.shields.io/badge/Gallery_(Minsta_clone)-deploy-blue)](https://vercel.com/new/clone?repository-url=https://github.com/ivanciric/minsta-clone)
<sup>(Make sure to adjust the .env variables as shown in the .env.example file)</sup>