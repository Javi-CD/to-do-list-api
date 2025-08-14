const prisma = require("../config/database");
const logger = require("../utils/logger");

// Import Validation Schemes
const {
  createTodoSchema,
  updateTodoSchema,
  todoQuerySchema,
} = require("../schemas/todo.schema");

const createTodo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    logger.debug(`Creating todo for user: ${userId}`);

    const validatedData = createTodoSchema.parse(req.body);
    const { title, description, priority, dueDate } = validatedData;
    logger.debug(`Todo data - title: "${title}", priority: ${priority}`);

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });
    logger.info(`Todo created successfully with ID: ${todo.id}`);

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

const getTodos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    logger.debug(`Getting todos for user: ${userId}`);

    const validatedQuery = todoQuerySchema.parse(req.query);
    const { completed, priority, page, limit } = validatedQuery;
    logger.debug(
      `Query filters - completed: ${completed}, priority: ${priority}, page: ${page}, limit: ${limit}`
    );

    // Build filters
    const where = {
      userId,
      ...(completed !== undefined && { completed }),
      ...(priority && { priority }),
    };

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Get todos with pagination
    const [todos, totalCount] = await Promise.all([
      prisma.todo.findMany({
        where,
        orderBy: [
          { completed: "asc" },
          { priority: "desc" },
          { dueDate: "asc" },
          { createdAt: "desc" },
        ],
        skip: offset,
        take: limit,
      }),
      prisma.todo.count({ where }),
    ]);
    logger.debug(`Found ${todos.length} todos out of ${totalCount} total`);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      success: true,
      message: "Todos obtained successfully",
      data: {
        todos,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo obtained successfully",
      data: { todo },
    });
  } catch (error) {
    next(error);
  }
};

const getTodoStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    logger.debug(`Getting todo stats for user: ${userId}`);

    const [totalTodos, completedTodos, pendingTodos, priorityStats] =
      await Promise.all([
        prisma.todo.count({ where: { userId } }),
        prisma.todo.count({ where: { userId, completed: true } }),
        prisma.todo.count({ where: { userId, completed: false } }),
        prisma.todo.groupBy({
          by: ["priority"],
          where: { userId, completed: false },
          _count: { priority: true },
        }),
      ]);

    const priorityCount = priorityStats.reduce(
      (acc, stat) => {
        acc[stat.priority] = stat._count.priority;
        return acc;
      },
      { LOW: 0, MEDIUM: 0, HIGH: 0, URGENT: 0 }
    );

    res.status(200).json({
      success: true,
      message: "Todo stats obtained successfully",
      data: {
        stats: {
          total: totalTodos,
          completed: completedTodos,
          pending: pendingTodos,
          completionRate:
            totalTodos > 0
              ? Math.round((completedTodos / totalTodos) * 100)
              : 0,
          priorityBreakdown: priorityCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    logger.debug(`Updating todo ${id} for user: ${userId}`);

    const validatedData = updateTodoSchema.parse(req.body);

    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    const updateData = { ...validatedData };

    if (updateData.dueDate !== undefined) {
      updateData.dueDate = updateData.dueDate
        ? new Date(updateData.dueDate)
        : null;
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });
    logger.info(`Todo ${id} updated successfully`);

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: { todo: updatedTodo },
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    logger.debug(`Deleting todo ${id} for user: ${userId}`);

    const existingTodo = await prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    await prisma.todo.delete({
      where: { id },
    });
    logger.info(`Todo ${id} deleted successfully`);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
};
