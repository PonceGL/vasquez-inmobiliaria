export const mockEnv = {
  NODE_ENV: "test",
  SESSION_SECRET: "a-super-secret-key-for-testing",
  API_TOKEN: "test-api-token-12345",

  POSTGRES_USER: "testuser",
  POSTGRES_PASSWORD: "testpassword",
  POSTGRES_DB: "testdb",

  GENERIC_TIMEZONE: "America/Mexico_City",
  TZ: "America/Mexico_City",

  MONGO_ROOT_USER: "root",
  MONGO_ROOT_PASSWORD: "rootpassword",
  MONGO_ROOT_DATABASE_NAME: "admin",
  MONGODB_URI: "mongodb://testuser:testpass@localhost:27017/testdb",

  SMTP_HOST: "smtp.test.com",
  SMTP_USER: "test@example.com",
  SMTP_PASSWORD: "testpassword",

  GEMINI_API_KEY: "test-gemini-key",

  CLOUDINARY_CLOUD_NAME: "test-cloud",
  CLOUDINARY_API_KEY: "test-key",
  CLOUDINARY_API_SECRET: "test-secret",
  CLOUDINARY_URL: "cloudinary://test-key:test-secret@test-cloud",
  CLOUDINARY_FOLDER: "test-folder",
  CLOUDINARY_PRESET: "test-preset",

  NEXT_PUBLIC_GA_ID: "G-TEST12345",
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.env = {
  ...process.env,
  ...mockEnv,
};