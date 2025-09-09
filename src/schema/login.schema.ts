import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ error: "Please enter a valid email address" })
    .max(100, { error: "Email must be at most 100 characters" }),

  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" })
    .max(100, { error: "Password must be at most 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      error:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
