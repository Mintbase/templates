"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkStoreName } from "@mintbase-js/data";
import { useMbWallet } from "@mintbase-js/react";
import {
  MINTBASE_CONTRACTS,
  NEAR_NETWORKS,
  deployContract,
  execute,
} from "@mintbase-js/sdk";
import { Network, Plus } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
  name: z
    .string()
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: "Only alphanumeric characters are allowed.",
    })
    .refine((value) => value.length <= 20, {
      message: "Maximum length is 20 characters.",
    }),
});

export function CreateBlogDialog() {
  const { selector, activeAccountId } = useMbWallet();

  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleDeployContract = async (data: FieldValues): Promise<void> => {
    if (!activeAccountId) return;
    const { data: checkStore } = await checkStoreName(
      data.name,
      NEAR_NETWORKS.TESTNET
    );

    if (checkStore?.nft_contracts.length === 0) {
      setError("");
      const wallet = await selector.wallet();
      const deployArgs = deployContract({
        name: data.name,
        ownerId: activeAccountId,
        factoryContractId: MINTBASE_CONTRACTS.testnet,
        metadata: {
          symbol: "",
        },
      });

      await execute({ wallet }, deployArgs);
    } else {
      setError("Contract already exists.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Create Blog
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Blog</DialogTitle>
          <DialogDescription>
            Start sharing your thoughts by creating a new blog.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDeployContract)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Input
                        maxLength={20}
                        placeholder="yourblogname"
                        onFocus={() => setError("")}
                        {...field}
                      />
                      {error ? (
                        <p
                          id=":rb:-form-item-message"
                          className="text-sm font-medium text-destructive"
                        >
                          {error}
                        </p>
                      ) : null}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Your contract will be: {form.watch("name")?.toLowerCase()}.
              {MINTBASE_CONTRACTS.testnet}
            </p>

            <DialogFooter className="mt-6">
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
