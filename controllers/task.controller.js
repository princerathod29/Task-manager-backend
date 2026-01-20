import { Task } from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is not requires" });
    }
    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      // userId: req.user.id,
    });
    return res
      .status(201)
      .json({ message: "Task created successfully", newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: " Failed to create task", error: error.message });
  }
};
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get tasks", error: error.message });
  }
};
export const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get task", error: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updateTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        priority,
        dueDate,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", updateTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to deleted a task", error: error.message });
  }
};
