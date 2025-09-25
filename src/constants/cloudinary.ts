import { env } from "@/config/env";

export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}`;
export const CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_FOLDER = env.CLOUDINARY_FOLDER;
export const CLOUDINARY_PRESET = env.CLOUDINARY_PRESET;
