const bcrypt = require("bcryptjs");

const prisma = require("../config/database");
const logger = require("../utils/logger");

// Import mock data
const { todos: todosMockData, users: usersMockData } = require("./mocks");

/**
 * Cleans all existing data from the database
 */
async function cleanDatabase() {
  logger.info("Cleaning existing data...");
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  logger.info("Existing data cleaned");
}

/**
 * Creates a default user using mock data
 * @returns {Object} Created user object
 */
async function createDefaultUser() {
  logger.info("Creating default user...");

  const defaultUserData = usersMockData.getDefaultUser();
  const hashedPassword = await bcrypt.hash(defaultUserData.password, 10);

  const user = await prisma.user.create({
    data: {
      name: defaultUserData.name,
      email: defaultUserData.email,
      password: hashedPassword,
    },
  });

  logger.success("Default user created");
  return user;
}

/**
 * Creates test todos for a given user
 * @param {string} userId - The user ID to create todos for
 */
async function createTestTodos(userId) {
  logger.info("Creating test todos...");

  const todosData = todosMockData.getTodosForUser1(userId);

  await prisma.todo.createMany({
    data: todosData,
  });

  logger.success("Test todos created");
}

/**
 * Shows seed completion statistics and credentials
 */
async function showSeedSummary() {
  const userCount = await prisma.user.count();
  const todoCount = await prisma.todo.count();
  const completedTodos = await prisma.todo.count({
    where: { completed: true },
  });

  logger.separator("SEED COMPLETED");
  logger.success("Seed completed successfully!");
  logger.info(`Users created: ${userCount}`);
  logger.info(`Todos created: ${todoCount}`);
  logger.info(`Completed todos: ${completedTodos}`);

  logger.separator("CREDENTIALS");
  const defaultUserData = usersMockData.getDefaultUser();
  logger.info(`Email: ${defaultUserData.email}`);
  logger.info(`Password: ${defaultUserData.password}`);
}

/**
 * Main seed function that orchestrates the seeding process
 * - Cleans existing data
 * - Creates a default user
 * - Creates test todos for the default user
 * - Shows completion summary
 */
async function seed() {
  logger.info("Starting database seed...");

  try {
    await cleanDatabase();
    const user = await createDefaultUser();
    await createTestTodos(user.id);
    await showSeedSummary();
  } catch (error) {
    logger.error("Error in seed process:", error);
    process.exit(1);
  }
}

seed()
  .catch((e) => {
    logger.error("Error in seed process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    logger.info("Database connection closed");
  });
