const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  completeTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");

const protectAuth = require("../middleware/protectAuth");

const router = express.Router();

// Create a new task
router.post("/", protectAuth, createTask);

// Retrieve all tasks for the authenticated user
router.get("/", protectAuth, getTasks);

// Edit an existing task
router.put("/:id", protectAuth, updateTask);

// Mark a task as completed
router.patch("/:id/complete", protectAuth, completeTask);

// Delete a task
router.delete("/:id", protectAuth, deleteTask);


// Get a single task by ID
router.get("/:id", protectAuth, getTaskById);

module.exports = router;
