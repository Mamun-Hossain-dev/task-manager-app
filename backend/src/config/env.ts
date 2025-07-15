import dotenv from "dotenv";

dotenv.config(); // Loads .env into process.env

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is missing!`);
  }
  return value;
};

export const config = {
  port: parseInt(getEnv("PORT", "5000")),
  mongodbUri: getEnv("MONGODB_URI"),
  nodeEnv: getEnv("NODE_ENV", "development"),
  isProduction: getEnv("NODE_ENV") === "production",
  accessSecret: getEnv("ACCESS_TOKEN_SECRET"),
  refreshSecret: getEnv("REFRESH_TOKEN_SECRET"),
};
