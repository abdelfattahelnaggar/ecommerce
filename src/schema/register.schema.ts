import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { error: "Name must be at least 3 characters" })
      .max(50, { error: "Name must be at most 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, {
        error: "Name can only contain letters and spaces",
      }),

    email: z
      .string()
      .trim()
      .toLowerCase()
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

    rePassword: z.string(),

    phone: z
      .string()
      .trim()
      .regex(/^01[0125][0-9]{8}$/, {
          error: "Phone number must be a valid Egyptian number (e.g., 01101791968)",
      }),
  })
  .refine((o) => o.password === o.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
