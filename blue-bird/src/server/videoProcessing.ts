'use server'
import sharp from 'sharp';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';

const engineId = 'stable-diffusion-v1-6';
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
  const apiKey = process.env.STABILITY_API_KEY;

  if (!apiKey) throw new Error('Missing Stability API key.');


export async function generateVideo(description: string): Promise<string> {
  try {

    const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: description,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
      }

      const responseJSON = await response.json();
      const artifacts = responseJSON.artifacts;

      // Variable to store the final video URL
      let finalVideoUrl: string | null = null;

      for (let i = 0; i < artifacts.length; i++) {
        const imageBase64 = artifacts[i].base64;
        const imageData = Buffer.from(imageBase64, 'base64');

        // Call resizeAndGenerateVideo and store the video URL
        const videoUrl = await resizeAndGenerateVideo(imageData);

        // If finalVideoUrl is null, set it to the current video URL
        // Otherwise, you can handle combining or choosing the appropriate video URL
        if (finalVideoUrl === null) {
          finalVideoUrl = videoUrl;
        }
        }

        if (finalVideoUrl === null) {
          throw new Error("No video URL found");
        }

    return finalVideoUrl;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function resizeImage(imageData: Buffer, targetWidth: number, targetHeight: number): Promise<Buffer> {
  // Your resizeImage function implementation
  try {
    const resizedImageBuffer = await sharp(imageData)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: sharp.fit.fill,
        position: sharp.strategy.entropy,
      })
      .toBuffer();

    return resizedImageBuffer;
  } catch (error) {
    throw new Error(`Error resizing image: ${(error as Error).message}`);
  }
}

export async function resizeAndGenerateVideo(imageData: Buffer): Promise<string> {

  try {
    const resizedImage = await resizeImage(imageData, 768, 768);

    const data = new FormData();
    data.append('image', resizedImage, { filename: 'image.png' });
    data.append('seed', 0);
    data.append('cfg_scale', 1.8);
    data.append('motion_bucket_id', 127);

    const formDataStream = data.getBuffer();

    const response = await fetch(`${apiHost}/v2alpha/generation/image-to-video`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...data.getHeaders(),
      },
      body: formDataStream,
    });

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const generationResponse = await response.json();
    const generationID = generationResponse.id;

    // Retrieve video URL
    const videoUrl = await retrieveVideo(generationID);
    return videoUrl;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

}

export async function processVideo(videoBlob: Blob): Promise<string> {

  try {
    // Convert Blob to Buffer
    const buffer = Buffer.from(await videoBlob.arrayBuffer());
    const saveDirectory = 'C:\\Users\\CCL\\Desktop\\fabrik\\blue-bird\\public\\videos'
  // Generate a random filename using a timestamp and a random string
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}_${randomString}.mp4`;
    // Define the full path including the directory and filename
    const filePath = path.join(saveDirectory, fileName);

    // Write Buffer data to the specified file path
    fs.writeFileSync(filePath, buffer);

    console.log(filePath)

    return fileName
} catch (error) {
    console.error("Error processing video:", error);
    throw error;
}
}

export async function retrieveVideo(generationID: string): Promise<string> {

  try {
    const res = await fetch(`${apiHost}/v2alpha/generation/image-to-video/result/${generationID}`, {
      method: 'GET',
      headers: {
        Accept: 'video/*',
        Authorization: `Bearer ${apiKey}`,

      },
    });

    if (res.status === 202) {
      console.log("Generation is still running, try again in 10 seconds.");
      await new Promise(resolve => setTimeout(resolve, 10000));
      return await retrieveVideo(generationID); // Recursive call
    } else if (res.status === 200) {
      console.log("Generation is complete!");
      const videoBlob = await res.blob();
      // Process and upload video to Arweave
      const videoUrl = await processVideo(videoBlob);

          // Return URL
          return videoUrl;
    } else {
      throw new Error(`Response ${res.status}: ${await res.text()}`);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
