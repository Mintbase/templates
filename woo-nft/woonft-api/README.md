# WooNFT API

WooNFT API is a custom backend service designed to integrate NFT minting capabilities into WooCommerce stores. It leverages the Mintbase API for NFT minting on the NEAR protocol and provides additional functionalities such as image resizing and license verification for domain-based access control.

## Features

- **AI image generation**: Create a unique AI art based on the actual product.
- **NFT Minting**: Allows WooCommerce store owners to mint NFTs corresponding to physical products.
- **Image Resizing**: Dynamically resizes product images before minting them as NFTs to meet platform requirements.
- **License Verification**: Ensures that only authorized domains can mint NFTs, enhancing security and control.
- **Environment Support**: Configurable for both testnet and mainnet, facilitating development, testing, and production deployments.

## Installation

To set up the WooNFT API in your environment, follow these steps:

1. **Clone the Repository**

```bash
git clone https://github.com/ivanciric/woo-api.git
cd woo-api
```

2. **Install dependencies**
```bash
npm install
```
To deploy the WooNFT API with Vercel, you need to install the Vercel CLI globally on your machine. Run the following command:

```bash
npm install -g vercel
```

3. **Configure environment variables**
```bash
Duplicate `.env.example` to `.env` and update it with your Mintbase, NEAR, and Firebase credentials.
```

4. **Start the development server**
```bash
vercel dev
```

Your API is now running and ready to connect your WooCommerce store to the blockchain!

## Usage

To interact with the API, here are some example usages:

### Get Image

Get image via POST request to `/api/get-image` with the image description.
```bash
curl -X POST 'https://<vercel-deployment-url>/api/get-image' \
-H 'Content-Type: application/json' \
-H 'x-license-key: your-license-key' \
-d '{
  "description": "A detailed description of the NFT image you want to generate."
}'
```

### Minting NFTs

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

### Verifying License

Verify a license by sending a POST request to `/api/verify-license` with your license key and domain.
```bash
curl -X POST 'https://<vercel-deployment-url>/api/verify-license' \
-H 'Content-Type: application/json' \
-d '{
  "licenseKey": "YOUR_LICENSE_KEY",
  "domain": "YOUR_DOMAIN"
}'
```

## Contributing

Contributions to WooNFT API are welcome! Feel free to fork the repository, make changes, and submit pull requests. If you encounter issues or have suggestions, please open an issue in the GitHub repository.

## License

WooNFT API is open-source software licensed under the MIT License. See the LICENSE file for more details.
