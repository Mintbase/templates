import dotenv from 'dotenv';
import fetch from 'node-fetch';
import sharp from 'sharp';

dotenv.config();

const defaultWidth = parseInt(process.env.RESIZE_WIDTH, 10) || 256;
export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'woonft-api.yoshi.tech');

    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }
    try {
        const { imageUrl, width = defaultWidth } = req.body;
        if (width > 512) throw new Error(`Width can not be larger than 512`);

        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
  
        const imageBuffer = await response.buffer();
  
        const resizedImageBuffer = await sharp(imageBuffer)
            .resize(width)
            .toBuffer();
  
        const resizedImageBase64 = resizedImageBuffer.toString('base64');
  
        res.status(200).json({ base64Image: resizedImageBase64 });
    } catch (error) {
        console.error('Error resizing image:', error);
        res.status(500).json({ error: 'Error resizing image' });
    }
};
