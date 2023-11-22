"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMintImage from "@/hooks/useMint";
import { getImageData } from "@/hooks/utils";
import { useState } from "react";

export default function Minter() {
  const { form, onSubmit, preview, setPreview } = useMintImage();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

  const handlePrompt = async (e: any) => {
    e.preventDefault();

        const promptValue = form.getValues("description");
    console.log(promptValue, 'promptValue')
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: {prompt: promptValue},
        version: "50f96fcd1980e7dcaba18e757acbac05e7f2ad4fbcb4a75f86a13c4086df26d0"
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

   console.log(prediction, 'prediction')
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({prediction})
      setPrediction(prediction);
    }
  };

  return ( 
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Mint your NFT</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-2"></div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Prompt" {...field} />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                   <Button onClick={handlePrompt} type="submit">prompt </Button>

            <div className="h-2"></div>
            {preview && (
              <img
                src={preview as string}
                alt="Selected Preview"
                style={{
                  maxWidth: "330px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            )}
            <FormField
              control={form.control}
              name="media"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="picture"
                      type="file"
                      {...rest}
                      onChange={(event) => {
                        const { files, displayUrl } = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files);
                      }}
                      className="file:bg-black file:text-white file:border file:border-solid file:border-grey-700 file:rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-center items-center">
            <Button type="submit">Mint Me </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
