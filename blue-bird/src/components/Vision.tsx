/* eslint-disable @typescript-eslint/no-explicit-any */
// Vision.tsx
'use client'
import React, { useState, useEffect, Suspense } from 'react';
import  { CardSkeleton } from './ui/skeletons';
import Webcam from 'react-webcam';
import { uploadReference } from '@mintbase-js/storage'; // Import the uploadReference function
import { useChat } from "ai/react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card";
import Image from 'next/image'
import { analyzeEmotions } from '@/app/api/emotion/edenAiService';
import useMintImage from '@/hooks/useMint';
import { models } from "../data/models";
import { Button } from './ui/button';
import EmotionRecommendations from './EmotionRecommendations';
import { LightBulbIcon } from '@heroicons/react/24/outline';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios';
import {  MicIcon } from 'lucide-react';
import { generateVideo } from '@/server/videoProcessing';


const Haiku = ({ lines }: { lines: string[] }) => (
  <pre className="whitespace-pre-wrap">
    {lines.map((line, index) => (
      <code key={index}>{line}</code>
    ))}
  </pre>
);

export default function Vision() {
  const [highestEmotion, setHighestEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [description, setDescription] = useState('');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false); // New state for webcam status
  const [model, setModel] = useState<string | undefined>();
  const [promptResult, setPromptResult] = useState<any | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [stabilityAIVideo, setStabilityAIVideo] = useState<string | null>(null);
  

  const webcamRef = React.useRef<Webcam>(null);
  const { onSubmit } = useMintImage();
  const { form, onSubmit: submitPrompt } = useMintImage();

  const toggleRecommendations = () => {
    setShowRecommendations(prevState => !prevState);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (description) {
      setLoading(true);
      generateVideo(description)
        .then((videoPath) => {
          setStabilityAIVideo(videoPath);
          setLoading(false); // Set loading state to false after receiving the video URL
        })
        .catch((error) => {
          console.error('Error fetching video from Stability AI:', error);
          setLoading(false); // Set loading state to false in case of error
        });
      }
  }, [description]);
  

  const { append, messages, isLoading } = useChat({
    api: "/api/chat-completion",
  });


  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      // Check if the last message is from the chat system
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setDescription(lastMessage.content); // Update description based on chat response
        generateAudio(lastMessage.content)
        setLoading(false);
      }
    }
  }, [messages, isLoading]);

  const toggleWebcam = () => {
    setWebcamEnabled(prevState => !prevState); // Toggle webcam status
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  const processImage = async (imageSrc: string) => {
    setLoading(true);

    try {
      // Convert imageSrc to a Blob
    const blob = await fetch(imageSrc).then(res => res.blob());

    // Create a File object from the Blob
    const file = new File([blob], 'uploaded_image.jpg', { type: 'image/jpeg' });

      // Upload the image to Arweave
      const metadata = {
        title: "Uploaded Image",
        media: file
      };
      const uploadResult = await uploadReference(metadata);

      // Get the URL of the uploaded image
      const imageUrl = "https://arweave.net/" + uploadResult.id;


      // Fetch the media value from the initial URL
      const mediaValue = await extractMediaValue(imageUrl);

      if (mediaValue) {
        setCapturedImage(mediaValue); // Update captured image URL
      // Call Eden AI service with the uploaded image URL
      const highestEmotionName = await analyzeEmotions(mediaValue);



      if (highestEmotionName !== null) {
        setHighestEmotion(highestEmotionName);
        append({ role: "user", content: "Craft a haiku of '" + highestEmotionName + "'—brief, yet full of warmth and light, life's simple delights."});
        // Pass data to parent component


      } else {
        setHighestEmotion('No emotions detected.');
      }
    } else{
        console.error("Media value not found")
    }
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch and extract the 'media' value
  async function extractMediaValue(url: string): Promise<string | undefined> {
    try {
      // Fetch the content from the URL
      const response = await fetch(url);
      const data = await response.json();

      // Extract the 'media' value
      const mediaValue = data.media;

      return mediaValue || '';
    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  }

  const clearData = () => {
    setHighestEmotion(null);
    setDescription('');
    setCapturedImage('');
    setPromptResult(null);
    setShowRecommendations(false);
    setAudioUrl('');
    setStabilityAIVideo(null);
  };

  

  const mintWorthy = async () => {
    // Prepare data to pass to Minter
    try {
  await onSubmit({
    title: highestEmotion || '',
    description: description,
    media: capturedImage as unknown as ((false | File) & (false | File | undefined)) | null,
  });
  // Optionally, you can display a success message or perform any other actions after minting is successful
  console.log("Minting successful");
  } catch (error){
    // Handle errors that occur during the minting process
    console.error("Error minting:", error)
  }
};

const handleModelChange = (value: string): void => {
  setModel(value);
};

const handlePrompt = async (e: React.MouseEvent) => {
  e.preventDefault();

  const promptValue = description; // Using description as prompt
  const response = await fetch("/api/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: { prompt: promptValue },
      version: model,
    }),
  });
  let prediction = await response.json();
  if (response.status !== 201) {
    console.error("Prediction error:", prediction.error);
    return;
  }

  setPromptResult(prediction);

  if (prediction.status === "succeeded") {
    form.setValue('media', prediction?.output[prediction.output.length - 1]);
  }

  while (prediction.status !== "succeeded" && prediction.status !== "failed") {
    await sleep(1000);
    const response = await fetch("/api/predictions/" + prediction.id);
    prediction = await response.json();
    if (response.status !== 200) {
      console.error("Prediction error:", prediction.error);
      return;
    }
    setPromptResult(prediction);
  }
};

const handleSubmit = async () => {
  form.setValue('media', promptResult?.output[promptResult.output.length - 1] || '');
  await submitPrompt(form.getValues());
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// handle text to audio
const generateAudio = async (text: string) => {
  try {
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/audio/text_to_speech",
      headers: {
        authorization: `Bearer ${process.env.EDEN_AI_API_KEY || 'hey'}`,
      },
      data: {
        providers: "amazon",
        language: "en",
        text: text,
        option: "MALE",
        fallback_providers: "",
      },
    };

    const response = await axios.request(options);
    const audioUrl = response.data.amazon.audio_resource_url || null;

    if (audioUrl) {
      setAudioUrl(audioUrl);
    } else {
      console.error('Audio URL not found in response data');
    }
  } catch (error) {
    console.error('Failed to generate audio:', error);
  }
};


const toggleAudio = () => {
  if (audioUrl) {
    new Audio(audioUrl).play();
  }
};

  return (
    <div className="flex justify-center items-center">
      <div>
      <div className="relative">
        <button className={`absolute top-0 right-0 mt-2 mr-2 ${highestEmotion ? '' : 'pointer-events-none'}`}  onClick={toggleRecommendations}>
          <LightBulbIcon className="w-6" />
        </button>
        {/* Mini card for recommendations */}
        {showRecommendations && (
          <div className="w-1/3 bg-white rounded-lg shadow-lg p-6">
            <EmotionRecommendations emotion={highestEmotion || ''} />
          </div>
        )}
      </div>
         <Card>
      <CardHeader>
        <CardTitle>Quetzal</CardTitle>
        <CardDescription>Capture moments and mint NFT</CardDescription>
      </CardHeader>
      <Suspense fallback={<CardSkeleton/>}>
      <CardContent>
        {isClient && (
          <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={webcamEnabled}
              onChange={toggleWebcam}
            />
            <span className="text-gray-700">Webcam</span>
          </label>
          {webcamEnabled && (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              height={480}
            />
          )}
        </div>
        )}

        <div className="flex flex-wrap gap-4">
            <button onClick={capture} className="flex-shrink-0 bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
               Capture
            </button>
            <button onClick={clearData} className="flex-shrink-0 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
               Clear Data
            </button>
            <button onClick={mintWorthy} className="flex-shrink-0 bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Mint Worthy
            </button>
            <button onClick={toggleAudio} >

          <MicIcon/>

      </button>
          </div>

        {loading && <p>Loading...</p>}
        {highestEmotion && !loading && <p>Title: {highestEmotion}</p>}
        <div className="mt-2">
                {description && !loading && <p>Description: <Haiku lines={description.split('\,')} /></p>}
          </div>


        {capturedImage && !loading && <Image src={capturedImage} alt="Captured" width={400} height={250}/>} {/* Render captured image */}
        {stabilityAIVideo && (
        <div>
          <p>Stability AI Generated Video:</p>
          <video width="400" height="240" controls preload="none">
            <source src={`/videos/${stabilityAIVideo}`} type="video/mp4" />
           Your browser does not support the video tag.
          </video>
        </div>
      )}
      </CardContent>
      </Suspense>

      <CardContent>
        <Select onValueChange={handleModelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => {
              return <SelectItem key={model.label} value={model.version}>{model.label}</SelectItem>
            })}
          </SelectContent>
        </Select>

        {promptResult?.status !== undefined && promptResult?.status !== "succeeded" && (
          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center space-y-4">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-white text-center">
              {promptResult?.status}
            </h1>
          </div>
        )}

        {promptResult?.status !== null && promptResult?.status == "succeeded" && (
          <Image src={promptResult?.output[promptResult.output.length - 1]} alt={"Result generated from prompt"} width={400} height={250} />
        )}

      </CardContent>
      <CardFooter className="justify-center items-center gap-2">
        <Button onClick={handlePrompt} type="submit">
          Paint
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={promptResult?.status !== "succeeded"}
        >
          Mint Me
        </Button>
      </CardFooter>
      <CardFooter>
        <p>@surfiniaburger</p>
      </CardFooter>
    </Card>
      </div>
    </div>
);
};



