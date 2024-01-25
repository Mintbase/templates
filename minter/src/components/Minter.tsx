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

export default function Minter() {
  const { form, onSubmit, preview, setPreview } = useMintImage();

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
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
