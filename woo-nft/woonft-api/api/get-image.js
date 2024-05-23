import OpenAI from "openai";

const defaultWidth = parseInt(process.env.RESIZE_WIDTH, 10) || 256;

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
                'Access-Control-Allow-Headers': 'Content-Type, X-License-Key, x-openai-api-key',
            },
        });
    }

    if (request.method === 'POST') {
        try {
            
            const origin = request.headers.get('origin') || 'example.org';
            const domain = origin.replace(/^(http:\/\/|https:\/\/)/, '');
            const licenseKey = request.headers.get('x-license-key') || 'xxx';
            const openaiApiKey = request.headers.get('x-openai-api-key') || '';

            if(!openaiApiKey) {
                return new Response(JSON.stringify({ error: 'Missing OpenAI API key' }), {
                    status: 400,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, X-License-Key, x-openai-api-key',
                    },
                });
            }
            
            if (!await verifyLicense(licenseKey, domain)) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 403,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, X-License-Key, x-openai-api-key',
                    },
                });
            }

            const openai = new OpenAI({
                apiKey: openaiApiKey
            });

            const reqBody = await request.json();
            const response = await openai.images.generate({
                prompt: reqBody.description,
                size: process.env.OPENAI_IMAGE_SIZE,
                model: process.env.OPENAI_IMAGE_MODEL,
                style: 'vivid',
                response_format: 'url'
            });

            let imageUrl = response.data[0].url;
            let width = reqBody.width ? reqBody.width : defaultWidth;
            let resizedImage = await resizeImageFromUrlToBase64(imageUrl, width);
            
            return new Response(JSON.stringify({ 
                image: resizedImage,
                imageUrl: imageUrl,
            }), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-License-Key, x-openai-api-key',
                },
            });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ error: 'Error generating image' }), {
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