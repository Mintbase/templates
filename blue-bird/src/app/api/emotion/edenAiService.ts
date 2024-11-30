// edenAiService.ts
import axios from 'axios';

interface EmotionResponse {
  [key: string]: number | null;
}

export async function analyzeEmotions(mediaValue: string) {
  try {
    const response = await axios.post('https://api.edenai.run/v2/image/face_detection', {
      providers: 'amazon',
      file_url: mediaValue,
      fallback_providers: '',
    }, {
      headers: {
        Authorization: `Bearer ${process.env.EDEN_AI_API_KEY || 'hey'}`,
      },
    });

    const edenaiEmotion: EmotionResponse = response.data['eden-ai'].items[0].emotions;

    let highestIntensity = -1;
    let highestEmotionName: string | null = null;

    for (const [emotion, intensity] of Object.entries(edenaiEmotion)) {
      if (intensity !== null && intensity > highestIntensity) {
        highestEmotionName = emotion;
        highestIntensity = intensity;
      }
    }

    return highestEmotionName;
  } catch (error) {
    console.error("Error analyzing emotions:", error);
    return null;
  }
}
