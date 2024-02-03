const CustomAPIError = require("../middlewares/custom-error");
const userServices = require("../services/user.service");

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await userServices.findUserById(id);
    res.status(200).json({
      message: "Get User Detail succesfully",
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

const registerUser = async (req, res) => {
  console.log(req.body);
  const user = await userServices.postUser(req.body);
  return res.json({
    status: "success",
    message: "User is created successfully",
    data: user,
  });
};

const loginUser = async (req, res) => {
  const token = await userServices.getUser(req.body);
  return res.json({
    status: "success",
    message: "User is credential matched! Here is your token",
    data: token,
  });
};

const updateUser = async (req, res) => {
  const user = await userServices.putUser(req.user, req.body);
  return res.json({
    status: "success",
    message: "User is updated successfully",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const user = await userServices.destroyUser(req.params);
  return res.json({
    status: "success",
    message: "User is deleted successfully",
    data: user,
  });
};

module.exports = {
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
