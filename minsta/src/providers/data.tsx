import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useIsClient } from 'usehooks-ts'

import { Alert } from "../components/Alert";

export function extractErrorMessage(error: Error): string {
  if (error instanceof Error) {
    const match = error.message.match(/'([^']+)'/);

    if (match && match[1]) {
      return match.input as string;
    }
  }

  return "An error occurred";
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const errMsg = extractErrorMessage(error as Error);
      toast.error(`src/providers/data.tsx \n \n ${errMsg}`, { duration: 40000, position: "bottom-left",   id:"query" });
    },
  }),
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const isClient = useIsClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isClient && <Alert /> }
    </QueryClientProvider>
  );
};

export default DataProvider;
