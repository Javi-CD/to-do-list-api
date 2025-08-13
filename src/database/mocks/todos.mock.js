/**
 * Mock data for todos
 * Used in database seeding
 */

const todosMockData = {
  /**
   * Get todos for user1
   * @param {string} userId - The user ID
   * @returns {Array} Array of todo objects
   */
  getTodosForUser1: (userId) => [
    {
      title: "Complete React Project",
      description:
        "Finish the application of every list with all functionalities",
      priority: "HIGH",
      completed: false,
      dueDate: new Date("2024-02-15"),
      userId: userId,
    },
    {
      title: "Study Prisma Documentation",
      description: "Study the best practices for database handling",
      priority: "MEDIUM",
      completed: true,
      userId: userId,
    },
    {
      title: "Set up CI/CD Pipeline",
      description: "Implement continuous integration and deployment pipeline",
      priority: "LOW",
      completed: false,
      dueDate: new Date("2024-03-01"),
      userId: userId,
    },
    {
      title: "Team Meeting",
      description: "Planify the next sprint week",
      priority: "URGENT",
      completed: false,
      dueDate: new Date("2024-01-20"),
      userId: userId,
    },
    {
      title: "Update Dependencies",
      description: "Review and update all project dependencies",
      priority: "MEDIUM",
      completed: true,
      userId: userId,
    },
  ],

  /**
   * Get additional todos for testing
   * @param {string} userId - The user ID
   * @returns {Array} Array of todo objects
   */
  getAdditionalTodos: (userId) => [
    {
      title: "Write Unit Tests",
      description: "Create comprehensive unit tests for the API",
      priority: "HIGH",
      completed: false,
      dueDate: new Date("2024-02-20"),
      userId: userId,
    },
    {
      title: "Code Review",
      description: "Review pull requests from team members",
      priority: "MEDIUM",
      completed: false,
      userId: userId,
    },
  ],
};

module.exports = todosMockData;