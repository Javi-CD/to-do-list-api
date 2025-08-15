const { z } = require("zod");

/**
 * Validation schema for registration
 * Validate user data for account creation:
 * - name: required name (2-50 characters)
 * - email: valid email format
 * - password: secure password with at least one lowercase, uppercase, and number
 */
const registerSchema = z.object({
  name: z
    .string({
      required_error: "The name is required",
    })
    .min(2, "The name must have at least 2 characters")
    .max(50, "The name cannot exceed 50 characters")
    .trim(),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: "The password is required",
    })
    .min(6, "The password must have at least 6 characters")
    .max(100, "The password cannot exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "The password must contain at least one tiny letter, a capital letter and a number"
    ),
});

/**
 * Validation schema for login
 * Validate access credentials:
 * - email: valid email format
 * - password: required password
 */
const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),

  password: z
    .string({
      required_error: "The password is required",
    })
    .min(1, "The password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
