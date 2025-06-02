const express = require('express');
const { createTask, getTasks, updateTask, completeTask, deleteTask, addTask } = require('../controllers/taskController');
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new task
router.post('/tasks', verifyToken, createTask);

// Retrieve all tasks for the authenticated user
router.get('/tasks', verifyToken, getTasks);

// Edit an existing task
router.put('/tasks/:id', verifyToken, updateTask);

// Mark a task as completed
router.patch('/tasks/:id/complete', verifyToken, completeTask);

// Delete a task
router.delete('/tasks/:id', verifyToken, deleteTask);

// Add a new route for adding a task without verification
router.post('/add', addTask);

// Register and login routes without token verification
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;