"use client";

import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  media: z.string().min(2, {
    message: "description must be at least 2 characters.",
  })
});


export { formSchema }