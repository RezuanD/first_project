import * as z from "zod";

export const articleAddFormSchema = z
  .object({
    title: z.string().min(8).max(128),
    text: z.string().min(36),
  });
