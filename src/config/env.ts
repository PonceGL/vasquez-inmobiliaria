import { z } from "zod";

const envSchema = z.object({
  // Variables del Servidor (no expuestas al cliente)
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SESSION_SECRET: z.string().min(10),
  API_TOKEN: z.string().min(10),

  GENERIC_TIMEZONE: z.string().min(1),
  TZ: z.string().min(1),

  MONGO_ROOT_USER: z.string().min(3),
  MONGO_ROOT_PASSWORD: z.string().min(3),
  MONGO_ROOT_DATABASE_NAME: z.string().min(3),
  MONGODB_URI: z.string().min(10),

  SMTP_HOST: z.string().min(1),
  SMTP_USER: z.string().email(),
  SMTP_PASSWORD: z.string().min(1),

  CLOUDINARY_CLOUD_NAME: z.string().min(3),
  CLOUDINARY_API_KEY: z.string().min(3),
  CLOUDINARY_API_SECRET: z.string().min(3),
  CLOUDINARY_URL: z.string().min(10),
  CLOUDINARY_FOLDER: z.string().min(3),
  CLOUDINARY_PRESET: z.string().min(3),

  // Variables Públicas (expuestas al cliente)
  NEXT_PUBLIC_GA_ID: z.string().startsWith("G-"),
  NEXT_PUBLIC_APP_URL: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables.");
}
export const env = parsedEnv.data;
