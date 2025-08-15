const { ZodError } = require("zod");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");

const logger = require("../utils/logger");

/**
 * Error handler middleware for Express.
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  logger.error("Caught error:", err);

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Invalid input data",
      errors: err.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      })),
    });
  }

  // Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "There is already a record with these unique data",
        });
      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Registration not found",
        });
      default:
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
    }
  }

  // Personalized error with status
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }

  // Generic error
  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  });
};

module.exports = { errorHandler };
