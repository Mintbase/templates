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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import useMintImage from "@/hooks/useMint";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";
import { models } from "../data/models"

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

type PromptResult = {
  error: string,
  id: string,
  input: {
    prompt: string,
  },
  logs: string,
  metrics: {
    predict_time: number,
  }
  model: string,
  output: string[],
  status: string,
  urls: {
    cancel: string,
    get: string,
  },
  version: string,
}

export default function Minter() {
  const { form, onSubmit, } = useMintImage();
  const [promptResult, setPrediction] = useState<PromptResult | null>(null);
  const [,setError] = useState<string | undefined>();
  const [model, setModel] = useState<string | undefined>();

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handlePrompt = async (e: React.MouseEvent) => {
    e.preventDefault();

    const promptValue = form.getValues("description");
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
    let prediction = await response.json() as PromptResult;
    if (response.status !== 201) {
      setError(prediction.error);
      return;
    }

    setPrediction(prediction);

    if( prediction.status === "succeeded") {
      form.setValue('media', prediction?.output[prediction.output.length-1])
    }

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json() as PromptResult;
      if (response.status !== 200) {
        setError(prediction.error);
        return;
      }
      setPrediction(prediction);
    }
  };

  const handleSubmit = async () => {
          form.setValue('media', promptResult?.output[promptResult.output.length-1] || '');
          await onSubmit(form.getValues());
  }


  function handleModelChange(value: string): void {
    setModel(value);
  }

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
            <Select onValueChange={handleModelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model"/>
              </SelectTrigger>
                <SelectContent>
                    {models.map( (model) => {
                      return <SelectItem key={model.label} value={model.version}>{model.label}</SelectItem>
                    })}
              </SelectContent>
            </Select>

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
                <Image src={promptResult?.output[promptResult.output.length-1]} alt={"Result generated from prompt"} width={300} height={250}/>
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
