"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

interface RequestProps {
  input: any;
  version: string;
}

interface ReplicateProps {
  id: string;
  inputs: any;
  output: any;
  status: any;
}

interface ReplicateContextProps {
  requests: Record<string, ReplicateProps> | null;
  addRequest: (input: any, version: string) => Promise<any>;
}

const ReplicateContext = createContext<ReplicateContextProps | undefined>(
  undefined
);

interface ReplicateProviderProps {
  children: ReactNode;
}

export const ReplicateProvider: React.FC<ReplicateProviderProps> = ({
  children,
}) => {
  const [requests, setRequests] = useState<Record<
    string,
    ReplicateProps
  > | null>(null);

  const addRequest = async (input: any, version: string) => {
    const prediction = await runPrediction({ input, version }, 2000);
    return prediction;
  };

  const runPrediction = async (
    request: RequestProps,
    timeBetweenRequests?: number
  ) => {
    try {
      const response = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: request.version,
          input: request.input,
        }),
      });
      let prediction = await response.json();
      if (response.status !== 201) {
        throw new Error("Failed to start prediction");
      }

      setRequests((prevRequests) => ({
        ...prevRequests,
        [prediction.id]: prediction,
      }));

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(timeBetweenRequests || 2000);
        const response = await fetch("/api/replicate/" + prediction.id, {
          cache: "no-store",
        });
        prediction = await response.json();
        if (response.status !== 200) {
          throw new Error("Failed to get prediction status");
        }
      }

      setRequests((prevRequests) => ({
        ...prevRequests,
        [prediction.id]: prediction,
      }));

      return prediction;
    } catch (error) {
      console.error("Prediction Error:", error);
      throw error; // Re-throw the error if you want calling function to know
    }
  };

  return (
    <ReplicateContext.Provider value={{ requests, addRequest }}>
      {children}
    </ReplicateContext.Provider>
  );
};

export const useReplicate = () => {
  const context = useContext(ReplicateContext);
  if (context === undefined) {
    throw new Error("useReplicate must be used within a ReplicateProvider");
  }
  return context;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
