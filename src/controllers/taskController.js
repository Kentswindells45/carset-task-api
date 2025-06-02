const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const newTask = new Task({
            title,
            description,
            status: 'pending',
            assignedUserId: userId,
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

// Retrieve all tasks for the authenticated user
const getTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json({ success: true, data: tasks, message: 'Tasks retrieved' });
    } catch (error) {
        next(error);
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};

// Mark a task as completed
const completeTask = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task marked as completed', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error completing task', error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
};

// Add a new task (similar to createTask, but can have different logic if needed)
const addTask = async (req, res) => {
    const { title, description } = req.body;
    // Allow userId from body if not authenticated
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required to add a task.' });
    }

    try {
        const newTask = new Task({
            title,
            description,
            status: 'pending',
            assignedUserId: userId,
        });

        await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error adding task', error: error.message });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    completeTask,
    deleteTask,
    addTask,
};