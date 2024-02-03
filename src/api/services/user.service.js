const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const CustomAPIError = require("../middlewares/custom-error");
const { generateToken } = require("../../lib/jwt");

const findUserById = async (id) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new CustomAPIError(`No User with id of ${id}`, 400);
    }

    return user;
  } catch (error) {
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const getUser = async (data) => {
  const { username, password } = data;
  if (!username) {
    throw new CustomAPIError("Invalid username or password", 401);
  }
  if (!password) {
    throw new CustomAPIError("Invalid username or password", 401);
  }
  // Step 1: Check if the username exists
  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new CustomAPIError("Invalid username or password", 401);
  }

  // Step 2: Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new CustomAPIError("Invalid username or password", 401);
  }

  // Generate JWT token
  const token = generateToken(user);

  return token;
};

const postUser = async (data) => {
  let { username, email, password, phone } = data;

  try {
    const existedUserUsername = await prisma.users.findFirst({
      where: { username: username },
    });

    if (existedUserUsername) {
      throw new CustomAPIError(`Username is taken`, 400);
    }

    const existedUserEmail = await prisma.users.findFirst({
      where: { email: email },
    });

    if (existedUserEmail) {
      throw new CustomAPIError(`Email is registered before`, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$transaction(async (tx) => {
      const createdUser = await tx.users.create({
        data: {
          username,
          email,
          password: hashedPassword,
          phone,
        },
      });

      return createdUser;
    });
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, 500);
  }
};

const putUser = async (pathParams, params) => {
  try {
    const { id } = pathParams;

    const user = await prisma.users.findUnique({
      where: { id: +id },
    });

    console.log(user);
    if (!user) {
      throw new CustomAPIError(`no user with id of ${id}`, 400);
    }

    const { username, email, password, phone } = params;
    console.log(params);
    if (password) {
      var hashedPassword = await bcrypt.hash(password, 10);
    }
    await prisma.users.update({
      where: {
        id: +id,
      },
      data: {
        username: username || user.username,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
    });

    const updateUser = await prisma.users.findUnique({
      where: { id: +id },
    });
    return updateUser;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

const destroyUser = async (params) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: +params.id },
    });

    if (!user) {
      throw new CustomAPIError(`No user with id ${params.id}`, 400);
    }

    console.log(params.id);

    await prisma.users.delete({
      where: {
        id: +params.id,
      },
    });

    return {
      deletedUser: user,
    };
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

module.exports = {
  findUserById,
  getUser,
  postUser,
  putUser,
  destroyUser,
};
