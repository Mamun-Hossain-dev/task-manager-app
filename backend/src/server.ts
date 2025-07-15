import app from "./app";
import { config } from "./config/env";
import { connectDB } from "./config/db";

const startServer = async () => {
  try {
    await connectDB();

    // app listen
    app.listen(config.port, () => {
      console.log(
        `Server is running in ${config.nodeEnv} mode on port ${config.port}`
      );
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
