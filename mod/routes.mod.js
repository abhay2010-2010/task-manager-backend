const { taskModel } = require("../model/task.model");

const addTask = async (req, res) => {
    try {
        const task = new taskModel(req.body);
        await task.save();
        res.status(200).send({ err: false, msg: "task created succesfully" })
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ err: true, msg: error })
    }
}

const getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.status(200).send({ err: false, msg: tasks })
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ err: true, msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send({ err: false, msg: task })
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ err: true, msg: error })
    }
}
const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ err: false, msg: task })
    }
    catch (error) {
        console.log(error);
        res.status(404).send({ err: true, msg: error })
    }
}

module.exports = {
    addTask,
    getTask,
    updateTask,
    deleteTask
}