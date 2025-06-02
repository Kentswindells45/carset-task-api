const express = require('express');
const { createTask, getTasks, updateTask, completeTask, deleteTask, addTask, getTaskById } = require('../controllers/taskController');
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Create a new task
router.post('/', verifyToken, createTask);

// Retrieve all tasks for the authenticated user
router.get('/', verifyToken, getTasks);

// Edit an existing task
router.put('/:id', verifyToken, updateTask);

// Mark a task as completed
router.patch('/:id/complete', verifyToken, completeTask);

// Delete a task
router.delete('/:id', verifyToken, deleteTask);

// Add a new route for adding a task without verification
router.post('/add', addTask);

// Register route with validation
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  registerUser(req, res, next);
});

// Login route without token verification
router.post('/login', loginUser);

// Get a single task by ID
router.get('/:id', verifyToken, getTaskById);

module.exports = router;