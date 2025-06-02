const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, category, priority, dueDate } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const newTask = new Task({
            title,
            description,
            category,    // bonus feature: category
            priority,    // bonus feature: priority
            dueDate,     // bonus feature: dueDate
            status: 'pending',
            user: userId, // <-- set the user field here
        });

        await newTask.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error: error.message });
    }
};

// Retrieve all tasks for the authenticated user
const getTasks = async (req, res, next) => {
    const userId = req.user.id;
    const { category, priority, completed, sortBy, order = 'asc' } = req.query;
    let filter = { user: userId };

    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed === 'true';

    let sort = {};
    if (sortBy) sort[sortBy] = order === 'desc' ? -1 : 1;

    try {
        const tasks = await Task.find(filter).sort(sort);
        res.status(200).json({ success: true, data: tasks, message: 'Tasks retrieved' });
    } catch (error) {
        next(error);
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const task = await Task.findOne({ _id: id, user: userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task, message: 'Task retrieved' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving task', error: error.message });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, category, priority, dueDate, completed } = req.body;

    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: userId },
            { title, description, category, priority, dueDate, completed },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error: error.message });
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
    getTaskById, 
    updateTask,
    completeTask,
    deleteTask,
    addTask,
};