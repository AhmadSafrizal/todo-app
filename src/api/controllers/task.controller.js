const {CustomAPIError, handleError} = require("../middlewares/custom-error");
const taskServices = require("../services/task.service");

const getAllTask = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const { title } = req.query;
    const tasks = await taskServices.findAll(user_id, title);
    if (tasks.length === 0) {
      throw new CustomAPIError(`No Task was found`, 400);
    }
    res.status(200).json({
      status: "success",
      message: "Get All Tasks",
      data: tasks,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const getOneTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);
    const tasks = await taskServices.findOne(id, user_id);

    res.status(200).json({
      status: "success",
      message: "Get Task",
      data: tasks,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const newTask = async (req, res) => {
  try {
    const tasks = await taskServices.create(req.body);
    if (!tasks) {
      throw new CustomAPIError(`No Task with id ${req.params.id}`, 400);
    }
    res.status(201).json({
      status: "success",
      message: "Create New Task Succesfully",
      data: tasks,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);
    const updatedTasks = await taskServices.update(id, user_id, req.body);
    res.status(200).json({
      status: "success",
      message: "Update Task Succesfully",
      data: updatedTasks,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);
    const tasks = await taskServices.destroy(id, user_id);
    res.status(200).json({
      status: "success",
      message: "Delete Task Succesfully",
      data: tasks,
    });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllTask,
  getOneTask,
  newTask,
  updateTask,
  deleteTask,
};
