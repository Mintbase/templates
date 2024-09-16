//Minter.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { uploadReference } from '@mintbase-js/storage';
import { useChat } from "ai/react";
import useMintImage from '@/hooks/useMint';
import Image from 'next/image';
import { models } from "../data/models";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { analyzeEmotions } from '@/app/api/emotion/edenAiService';
import { generateVideo } from '@/server/videoProcessing';



// Vision component code...
export default function Vision() {
  const [highestEmotion, setHighestEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [description, setDescription] = useState('');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false);
  const [model, setModel] = useState<string | undefined>();
  const [promptResult, setPromptResult] = useState<any | null>(null);
  const webcamRef = React.useRef<Webcam>(null);
  const { onSubmit: mintImage } = useMintImage();
  const { form, onSubmit: submitPrompt } = useMintImage();
  const [stabilityAIVideo, setStabilityAIVideo] = useState<string | null>(null);


  useEffect(() => {
    setIsClient(true);
  }, []);

  const { append, messages, isLoading } = useChat({
    api: "/api/chat-completion",
  });

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        setDescription(lastMessage.content);
        setLoading(false);

      }
    }
  }, [messages, isLoading]);


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
  

  const toggleWebcam = () => {
    setWebcamEnabled(prevState => !prevState);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      processImage(imageSrc);
    }
  }, [webcamRef]);

  const processImage = async (imageSrc: string) => {
    setLoading(true);

    try {
      const blob = await fetch(imageSrc).then(res => res.blob());
      const file = new File([blob], 'uploaded_image.jpg', { type: 'image/jpeg' });
      const metadata = {
        title: "Uploaded Image",
        media: file
      };
      const uploadResult = await uploadReference(metadata);
      const imageUrl = "https://arweave.net/" + uploadResult.id;
      const mediaValue = await extractMediaValue(imageUrl);

      if (mediaValue) {
        setCapturedImage(mediaValue);
        const highestEmotionName = await analyzeEmotions(mediaValue);

        if (highestEmotionName !== null) {
          setHighestEmotion(highestEmotionName);
          append({ role: "user", content: "Craft a haiku of '" + highestEmotionName + "'—brief, yet full of warmth and light, life's simple delights." });
        } else {
          setHighestEmotion('No emotions detected.');
        }
      } else {
        console.error("Media value not found")
      }
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  async function extractMediaValue(url: string): Promise<string | undefined> {
    try {
      const response = await fetch(url);
      const data = await response.json();
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
    setStabilityAIVideo(null);
  };

  const mintWorthy = async () => {
    try {
      await mintImage({
        title: highestEmotion || '',
        description: description,
        media: capturedImage as unknown as ((false | File) & (false | File | undefined)) | null,
      });
      console.log("Minting successful");
    } catch (error) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quetzal</CardTitle>
        <CardDescription>Capture moments and mint NFT</CardDescription>
      </CardHeader>
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
                width={480}
                height={480}
              />
            )}
          </div>
        )}

        <button onClick={capture} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Capture
        </button>
        <button onClick={clearData} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
          Clear Data
        </button>
        <button onClick={mintWorthy} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">Mint Worthy</button>

        {loading && <p>Loading...</p>}
        {highestEmotion && !loading && <p>Title: {highestEmotion}</p>}
        <div className="mt-2">
          {description && !loading && <p>Description: {description}</p>}
        </div>
        {capturedImage && !loading && <Image src={capturedImage} alt="Captured" width={180} height={180} />}
        {stabilityAIVideo && (
        <div>
          <p>Stability AI Generated Video:</p>
          <video width="320" height="240" controls preload="none">
            <source src={`/videos/${stabilityAIVideo}`} type="video/mp4" />
           Your browser does not support the video tag.
          </video>
        </div>
      )}
      </CardContent>
      <CardFooter>
        <p>@surfiniaburger</p>
      </CardFooter>

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
          <Image src={promptResult?.output[promptResult.output.length - 1]} alt={"Result generated from prompt"} width={300} height={250} />
        )}
      </CardContent>
      <CardFooter className="justify-center items-center gap-2">
        <Button onClick={handlePrompt} type="submit">
          Prompt
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={promptResult?.status !== "succeeded"}
        >
          Mint Me
        </Button>
      </CardFooter>
    </Card>
  );
}
