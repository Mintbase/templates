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

const Spinner = () => {
  return (
    <div className="lds-ellipsis">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default function Minter() {
  const { form, onSubmit, preview, setPreview } = useMintImage();
  const [promptResult, setPrediction] = useState<any>(null);
  const [error, setError] = useState(null);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handlePrompt = async (e: any) => {
    e.preventDefault();

    const promptValue = form.getValues("description");
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { prompt: promptValue },
        version:
          "50f96fcd1980e7dcaba18e757acbac05e7f2ad4fbcb4a75f86a13c4086df26d0",
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    console.log(prediction, "prediction");
    setPrediction(prediction);

    if( prediction.status === "succeeded") {
      form.setValue('media', prediction?.output[24])

      console.log(form.getValues("media"), 'form.getValues("description")')
    }

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
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  const handleSubmit = async () => {

          form.setValue('media', promptResult?.output[24])

          await onSubmit(form.getValues())
          console.log(form.getValues())

  }

  console.log(
     promptResult?.status !== null &&
              promptResult?.status == "succeeded", promptResult?.output
  )

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

            <div className="h-2"></div>

            {promptResult?.status !== undefined &&
              promptResult?.status !== "succeeded" && (
                <div className="container mx-auto px-4 md:px-8 flex flex-col items-center justify-center space-y-4">
                  <Spinner />
                  <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-white text-center">
                    {promptResult?.status}
                  </h1>
                </div>
              )}

            {promptResult?.status !== null &&
              promptResult?.status == "succeeded" && (
                <img src={promptResult?.output[25]} />
              )}
          </CardContent>
          <CardFooter className="justify-center items-center gap-2">
            <Button onClick={handlePrompt} type="submit">
              prompt{" "}
            </Button>{" "}
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={promptResult?.status !== "succeeded"}
            >
              Mint Me{" "}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
