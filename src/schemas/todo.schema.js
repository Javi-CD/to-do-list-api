const { z } = require("zod");

const Priority = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);

/**
 * Validation schema for creating new todos
 * Validates the required data to create a new todo item:
 * - title: Todo title (1-200 characters, required)
 * - description: Optional description (max 1000 characters)
 * - priority: Priority level (LOW, MEDIUM, HIGH - defaults to MEDIUM)
 * - dueDate: Optional due date in ISO 8601 format
 */
const createTodoSchema = z.object({
  title: z
    .string({
      required_error: "The title is required",
    })
    .min(1, "The title cannot be empty")
    .max(200, "The title cannot exceed 200 characters")
    .trim(),

  description: z
    .string()
    .max(1000, "The description cannot exceed 1000 characters")
    .trim()
    .optional(),

  priority: Priority.default("MEDIUM"),

  dueDate: z
    .string()
    .datetime("Invalid date format (ISO 8601 required)")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
});

/**
 * Validation schema for updating existing todos
 * Validates the data for updating a todo item (all fields optional):
 * - title: Updated title (1-200 characters)
 * - description: Updated description (max 1000 characters, empty string converts to null)
 * - completed: Boolean completion status
 * - priority: Updated priority level (LOW, MEDIUM, HIGH)
 * - dueDate: Updated due date in ISO 8601 format (empty string converts to null)
 */
const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, "The title cannot be empty")
    .max(200, "The title cannot exceed 200 characters")
    .trim()
    .optional(),

  description: z
    .string()
    .max(1000, "The description cannot exceed 1000 characters")
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),

  completed: z.boolean().optional(),

  priority: Priority.optional(),

  dueDate: z
    .string()
    .datetime("Invalid date format (ISO 8601 required)")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? null : val)),
});

/**
 * Validation schema for todo query parameters
 * Validates query parameters for filtering and pagination:
 * - completed: Filter by completion status ("true"/"false" string converted to boolean)
 * - priority: Filter by priority level (LOW, MEDIUM, HIGH)
 * - page: Page number for pagination (default: 1, must be > 0)
 * - limit: Items per page (default: 10, range: 1-100)
 */
const todoQuerySchema = z.object({
  completed: z
    .string()
    .optional()
    .transform((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return undefined;
    }),

  priority: Priority.optional(),

  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, "The page must be greater than 0"),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine(
      (val) => val > 0 && val <= 100,
      "The limit must be between 1 and 100"
    ),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  todoQuerySchema,
  Priority,
};
