const express = require("express");
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
} = require("../controllers/todo.controller");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Apply authentication to all the routes of this router
router.use(authenticateToken);

/**
 * @route   Post /api/Todos
 * @desc    Create new todo
 * @access  Private
 * @body    {Title, description?, priority? }
 * @headers Authorization: Bearer <Token>
 */
router.post("/", createTodo);

/**
 * @route   Get/api/Todos
 * @desc    Obtain all the todos of the user
 * @access  Private
 * @query   { completed?, priority?, page?, limit? }
 * @headers Authorization: Bearer <token>
 */
router.get("/", getTodos);

/**
 * @route   Get/api/Todos/Stats
 * @desc    Obtain statistics of all the todos of the user
 * @access  Private
 * @headers Authorization: Bearer <token>
 */
router.get("/stats", getTodoStats);

/**
 * @route   Get/api/Todos/:id
 * @desc    Obtain a specific todo
 * @access  Private
 * @params  id - ID of the todo
 * @headers Authorization: Bearer <token>
 */
router.get("/:id", getTodoById);

/**
 * @route   Put/api/Todos/:id
 * @desc    Update todo
 * @access  Private
 * @params  id - ID of the todo
 * @body    { Title?, Description?, Completed?, Priority?, DueDate? }
 * @headers Authorization: Bearer <Token>
 */
router.put("/:id", updateTodo);

/**
 * @route   Delete/api/Todos/:id
 * @desc    Delete todo
 * @access  Private
 * @params  id - ID of the todo
 * @headers Authorization: Bearer <Token>
 */
router.delete("/:id", deleteTodo);

module.exports = router;
