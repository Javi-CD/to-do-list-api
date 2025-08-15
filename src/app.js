const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const todoRoutes = require("./routes/todo.routes");

// Import Middlewares
const { errorHandler } = require("./middleware/errorHandler");
const { notFound } = require("./middleware/notFound");

const app = express();

// Define rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requirements per time window
  message: {
    error: "Too many requests from this IP, try again in 15 minutes.",
  },
});

// Define authentication rate limiter
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, try again in 5 minutes." },
});

// Security
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3001",
    credentials: true,
  })
);
app.use(xss());
app.use(hpp());
app.disable("x-powered-by");

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
app.use(limiter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Todo-List API is running properly",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes, authLimiter);
app.use("/api/todos", todoRoutes);

// Error Management Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
