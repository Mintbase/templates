"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMbWallet } from "@mintbase-js/react";
import { uploadReference } from "@mintbase-js/storage";
import "easymde/dist/easymde.min.css";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";

import { useUserBlogs } from "@/hooks/useUserBlogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { MINTBASE_CONTRACTS, execute, mint } from "@mintbase-js/sdk";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  contract: z.string(),
  media: z
    .custom<FileList>()
    .transform((file) => file?.length > 0 && file?.item(0))
    .refine((file) => !file || (!!file && file?.size <= 10 * 1024 * 1024), {
      message: "The media must be a maximum of 10MB.",
    })
    .refine((file) => !file || (!!file && file?.type?.startsWith("image")), {
      message: "Only images are allowed to be sent.",
    }),
});

export function CreatePostDialog() {
  const [postContent, setPostContent] = useState("");
  const [preview, setPreview] = useState<string | File>("");

  const { selector, activeAccountId } = useMbWallet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const autofocusNoSpellcheckerOptions: EasyMDE.Options = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      sideBySideFullscreen: false,
      showIcons: ["code", "table", "quote"],
    };
  }, []);

  const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  };

  const { blogs } = useUserBlogs(activeAccountId || "");

  const onPostContentChange = useCallback((value: string) => {
    setPostContent(value);
  }, []);

  const handlePostMint = async (data: FieldValues): Promise<void> => {
    if (preview && activeAccountId) {
      //call storage method to upload file to arweave
      const metadata = {
        title: data.title,
        media: data.media,
      };
      const referenceJson = await uploadReference(metadata);
      const reference = referenceJson.id;

      if (reference) {
        const wallet = await selector.wallet();
        const mintCall = mint({
          noMedia: true,
          metadata: {
            reference: reference,
            title: data.title,
            description: postContent,
            extra: "blogpost",
          },
          contractAddress: data.contract,
          ownerId: activeAccountId,
        });

        await execute({ wallet }, mintCall);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Post</DialogTitle>
          <DialogDescription>
            Start sharing your new thoughts by creating a post.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePostMint)}>
            <div className="space-y-8 h-[300px] overflow-y-auto w-full px-1">
              <FormField
                control={form.control}
                name="contract"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the blog you want to post" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {blogs?.map(({ id }, index) => (
                          <SelectItem key={`${id}-${index}`} value={id}>
                            {id.replace(`.${MINTBASE_CONTRACTS.testnet}`, "")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Label>Content</Label>

                <div className="markdownEditor">
                  <SimpleMDE
                    options={autofocusNoSpellcheckerOptions}
                    value={postContent}
                    onChange={onPostContentChange}
                  />
                </div>
              </div>

              <div>
                <Label>Image</Label>
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
              </div>
            </div>
            <div className="mt-2 border-t text-end">
              <Button type="submit" className="mt-4">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
