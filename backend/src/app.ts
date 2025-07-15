import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes/authRoutes";
import rateLimit from "express-rate-limit";

const app = express();

// middleware
app.use(
  helmet({
    hsts: config.isProduction,
  })
);

app.use(morgan(config.isProduction ? "combined" : "dev"));

const allowedOrigins = ["http://localhost:3000", "https://myapp.com"];

app.use(
  cors({
    origin: config.isProduction
      ? (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        }
      : true, // In development (Postman, localhost), allow all
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// in production general rate limiter
if (config.isProduction) {
  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per IP
    message: "Too many requests from this IP, please try again later.",
  });

  app.use("/api", generalLimiter);
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Task Manager API 🚀" });
});

// mount auth routes (rate limit is applied conditionally in routes)
app.use("/api/auth", router);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
