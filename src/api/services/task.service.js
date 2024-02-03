const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (user_id, title) => {
  const filterOptions = {
    where: {
      user_id: +user_id,
    },
    orderBy: {
      id: "asc",
    },
  };

  if (title) {
    filterOptions.where.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  const tasks = await prisma.tasks.findMany(filterOptions);
  return tasks;
};

const findOne = async (id, user_id) => {
  try {
    const task = prisma.tasks.findUnique({
      where: {
        id,
        user_id,
      },
    });

    if (!task) {
      throw new CustomAPIError(`No Task with id ${id} was found`, 404);
    }

    return task;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(
      `Error: ${error.message}`,
      error.statusCode || 500
    );
  }
};

const create = async (params) => {
  //Solved
  try {
    let { user_id, category_id, title, description, is_completed, due_date } =
      params;

    const created_date = new Date().toISOString();

    if (is_completed == null) {
      is_completed = false;
    } else {
      is_completed = true;
    }
    const tasks = await prisma.tasks.create({
      data: {
        user_id,
        category_id,
        title,
        description,
        is_completed,
        due_date,
        created_date,
      },
    });
    return tasks;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (id, user_id, params) => {
  try {
    // const { id, user_id } = pathParams;
    const { category_id, title, description, is_completed, due_date } = params;

    const task = await prisma.tasks.findUnique({
      where: {
        id: +id,
        user_id: +user_id,
      },
    });

    if (!task) {
      throw new CustomAPIError(`no task with id of ${id}`, 400);
    }

    const updatedTask = await prisma.tasks.update({
      where: {
        id,
        user_id,
      },
      data: {
        // id: task.id,
        // user_id: task.user_id,
        category_id: category_id || task.category_id,
        title: title || task.title,
        description: description || task.description,
        is_completed: is_completed || task.is_completed,
        due_date: due_date || task.due_date,
        // created_at: task.created_date,
      },
    });
    return updatedTask;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500);
  }
};

const destroy = async (id, user_id) => {
  try {
    // const { id, user_id } = params;
    const tasks = await prisma.tasks.delete({
      where: {
        id,
        user_id,
      },
    });
    return tasks;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error: ${error.message}`, 500);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
