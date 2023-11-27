"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import useDeployContract from "@/hooks/useDeployContract";

export default function ContractDeployer() {
  const { form, onSubmit, alreadyExistsError, setAlreadyExistsError } =
    useDeployContract();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Deploy your smart contract</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Name"
                        {...field}
                        onFocus={() => {
                          if (alreadyExistsError) {
                            setAlreadyExistsError("");
                          }
                        }}
                      />
                      {alreadyExistsError ? (
                        <p
                          id=":rb:-form-item-message"
                          className="text-sm font-medium text-destructive"
                        >
                          {alreadyExistsError}
                        </p>
                      ) : null}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-2"></div>
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Symbol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-center items-center">
            <Button type="submit">Deploy Contract</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
