/**
 * Not found middleware for Express.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const notFound = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return res.status(404).json({
      success: false,
      message: `Route ${req.originalUrl} not found`,
      availableEndpoints: {
        auth: {
          "POST /api/auth/register": "Register new user",
          "POST /api/auth/login": "Login user",
          "GET /api/auth/profile": "Get user profile (requires token)",
        },
        todos: {
          "GET /api/todos": "Get all todos of user (requires token)",
          "POST /api/todos": "Create new todo (requires token)",
          "GET /api/todos/:id": "Get specific todo (requires token)",
          "PUT /api/todos/:id": "Update todo (requires token)",
          "DELETE /api/todos/:id": "Delete todo (requires token)",
        },
        health: {
          "GET /health": "Check server status",
        },
      },
    });
  }

  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = { notFound };
