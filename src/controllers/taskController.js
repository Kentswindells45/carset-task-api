const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, category, priority, dueDate, status } = req.body;
  const userId = req.user.id;

  try {
    const newTask = new Task({
      title,
      description,
      category,
      priority,
      dueDate,
      user: userId,
      status,
    });

    const task = await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: task });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating task", error: error.message });
  }
};

// Retrieve all tasks for the authenticated user
const getTasks = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ user: userId });
    res
      .status(200)
      .json({ success: true, data: tasks, message: "Tasks retrieved" });
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
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, data: task, message: "Task retrieved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving task", error: error.message });
  }
};

// Update an existing task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, description, category, priority, dueDate, completed } =
    req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, category, priority, dueDate, completed },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating task", error: error.message });
  }
};

// Mark a task as completed
const completeTask = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task marked as completed", task: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error completing task", error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  completeTask,
  deleteTask,
};
