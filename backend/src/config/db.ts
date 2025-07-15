import mongoose from "mongoose";
import { config } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    // console.log(config.mongodbUri);
    await mongoose.connect(config.mongodbUri);
    console.log("MongoDb connected");
  } catch (err) {
    console.error("MongoDB connection Error:", err);
    process.exit(1);
  }
};

// export const disconnectDB = (): Promise<void> => mongoose.connection.close();
