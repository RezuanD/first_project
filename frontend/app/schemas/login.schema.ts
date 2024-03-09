import * as z from "zod";

export const loginFormSchema = z
  .object({
    username: z.string().min(8).max(36),
    password: z.string().min(8),
  });
