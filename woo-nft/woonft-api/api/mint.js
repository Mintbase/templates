import fetch from 'node-fetch';

const network = process.env.NETWORK;
const nftContract = network == 'testnet' ? process.env.NFT_CONTRACT_TESTNET : process.env.NFT_CONTRACT_MAINNET;
const minter = network == 'testnet' ? process.env.MINTER_TESTNET : process.env.MINTER_MAINNET;
const mintbaseWalletUrl = network == 'testnet' ? process.env.MINTBASE_WALLET_TESTNET : process.env.MINTBASE_WALLET_MAINNET;
const uploadUrl = network == 'testnet' ? process.env.MINTBASE_ARWEAVE_UPLOAD_URL_TESTNET : process.env.MINTBASE_ARWEAVE_UPLOAD_URL_MAINNET;
const defaultWidth = parseInt(process.env.RESIZE_WIDTH, 10) || 512;

export const config = {
    runtime: 'experimental-edge',
};

export default async (request) => {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-License-Key',
            },
        });
    }

    if (request.method === 'POST') {
        try {
            const origin = request.headers.get('origin') || 'example.org';
            const domain = origin.replace(/^(http:\/\/|https:\/\/)/, '');
            const licenseKey = request.headers.get('x-license-key') || 'xxx';

            if (!await verifyLicense(licenseKey, domain)) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 403,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
            }

            const { imageUrl, name, description, redirectUrl } = await request.json();
            let base64Image = await resizeImageFromUrlToBase64(imageUrl, 512);
            let uploadResult = await uploadToArweave(base64Image); 
            let arweaveId = uploadResult.id;
            const originUrl = new URL(redirectUrl);
            const params = new URLSearchParams(originUrl.search);
            if (params.has('transactionHashes')) {
                params.delete('transactionHashes');
                originUrl.search = params.toString();
            }
            originUrl.searchParams.set('network', network);
            originUrl.searchParams.set('reference', arweaveId);
            let url = constructSignUrl(arweaveId, name, description, originUrl);

            return new Response(JSON.stringify({ signUrl: url }), {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ error: 'Error in minting process' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } else {
        return new Response(`Method ${request.method} Not Allowed`, {
            status: 405,
            headers: {
                'Allow': ['POST'],
            },
        });
    }
};

async function resizeImageFromUrlToBase64(imageUrl, width = defaultWidth) {
    try {
        const payload = {
            imageUrl: imageUrl,
            width: width
        };
    
        const resizeResponse = await fetch('https://woonft-api.yoshi.tech/api/resize-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
    
        if (!resizeResponse.ok) throw new Error('Failed to resize image');
    
        const { base64Image } = await resizeResponse.json();
        return base64Image;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error in minting process' });
    }
}

async function uploadToArweave(base64Image) {
    const base64Data = base64Image.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');
    const formData = new FormData();
    formData.append('media', new Blob([buffer], { type: 'image/png' }), 'wooImage.png');

    try {
        const response = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Mb-Api-Key': process.env.MINTBASE_ARWEAVE_API_KEY,
          }
        });
    
        if (!response.ok) {
          throw new Error(`Failed to upload image: ${response.statusText}`);
        }

        const result = await response.json();
        return result;

      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
  }
  
function constructSignUrl(arweaveId, name, description, redirectUrl) {
    const transactionsData = [{
        receiverId: minter,
        signerId: "",
        actions: [{
        type: "FunctionCall",
        params: {
            methodName: "mint",
            args:
            {
                "metadata": `{"reference":"${arweaveId}", "title": "WooNFT Art", "description": "${description}"}`,
                "nft_contract_id": nftContract,
            },
            gas: "200000000000000",
            deposit: "10000000000000000000000"
        }
        }]
    }];
    
    const callbackUrl = redirectUrl;
    const encodedTransactionsData = encodeURIComponent(JSON.stringify(transactionsData));
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const mintbaseSignTransactionUrl = `${mintbaseWalletUrl}/sign-transaction?transactions_data=${encodedTransactionsData}&callback_url=${encodedCallbackUrl}`;
    
    return mintbaseSignTransactionUrl;
}

async function verifyLicense(licenseKey, domain) {
    try {
        const response = await fetch('https://woonft-api.yoshi.tech/api/verify-license', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ licenseKey, domain })
        });

        if (!response.ok) {
            console.error('Failed to verify license:', response.statusText);
            return false;
        } 
        
        return true;

    } catch (error) {
        console.error('Error verifying license:', error);
        return false;
    }
}