const { PrismaClient } = require("@prisma/client");
const logger = require("../utils/logger");

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

// Connection management
prisma
  .$connect()
  .then(() => {
    logger.success("Connected to the database");
  })
  .catch((error) => {
    logger.error("Error connecting to the database:", error);
    process.exit(1);
  });

// Graceful Closing Management
process.on("beforeExit", async () => {
  await prisma.$disconnect();
  logger.info("Disconnected from the database");
});

module.exports = prisma;
