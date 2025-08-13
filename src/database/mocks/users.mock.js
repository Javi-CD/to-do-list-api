/**
 * Mock data for users
 * Used in database seeding
 */

const usersMockData = {
  /**
   * Get default user data
   * @returns {Object} User object with default credentials
   */
  getDefaultUser: () => ({
    name: process.env.DEFAULT_USER_NAME || "Test User",
    email: process.env.DEFAULT_USER_EMAIL || "test@example.com",
    password: process.env.DEFAULT_USER_PASSWORD || "password123",
  }),

  /**
   * Get additional test users
   * @returns {Array} Array of user objects
   */
  getTestUsers: () => [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123",
    },
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
    },
  ],
};

module.exports = usersMockData;
