"use client";

import * as z from "zod";

const formSchema = z.object({
  name: z
    .string()
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: "Only alphanumeric characters are allowed.",
    })
    .refine((value) => value.length <= 20, {
      message: "Maximum length is 20 characters.",
    }),
  symbol: z.string().min(1, {
    message: "description must be at least 1 character.",
  }).refine((value) => value.length <= 20, {
    message: "Maximum length is 5 characters."
  }),
});

export { formSchema };
