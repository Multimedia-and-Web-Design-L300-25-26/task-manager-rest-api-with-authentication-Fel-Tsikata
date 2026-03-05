import Task from "../models/Task.js";

export const createTask = async( req,res) => {
    try{
        const {title,description} = req.body;
        if(!title){
            return res.status(400).json({
            message: "Title is required"
        });
        }

        const task = await Task.create({
            title,
            description,
            owner: req.user.id
        });
        return res.status(201).json(task);
    }catch(error){
        return res.status(500).json({
            message: "Server error"
        });
    }
};
export const getTasks = async(req,res) => {
    try{
        const tasks = await Task.find({owner: req.user.id});

        return res.status(200).json(tasks);
    }catch(error){
        return res.status(500).json({
            message: " Server Error"
        });
    }
};
export const getTaskById = async(req,res) => {
    try{
        const id = req.params.id;

        const task = await Task.findById(id);
        if(!task){
            return res.status(404).json({
                status: "error",
                message: "Task not found"
            })
        }
    if (task.owner.toString() !== req.user.id){
            return res.status(403).json({
                status: "error",
                message: "Not authorized to access this task"
            });
    }
    return res.status(200).json({
        status: "success",
        data: task
    });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Server Error"
        });
    }
};
export const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (completed !== undefined) updateData.completed = completed;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            updateData,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: updatedTask
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Server Error"
        });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete(
            { _id: req.params.id, owner: req.user.id }
        );

        if (!deletedTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Task deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Server Error"
        });
    }
};