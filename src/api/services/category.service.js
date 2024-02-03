const prisma = require("../../lib/prisma");
const CustomAPIError = require("../middlewares/custom-error");

const findAll = async (params) => {
  const filterOptions = {
    where: {},
    orderBy: {
      id: "asc",
    },
  };
  const { name } = params;

  if (name) {
    filterOptions.where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const categories = await prisma.categories.findMany(filterOptions);
  return categories;
};

const findOne = async (params) => {
  try {
    const { id } = params;
    const categories = prisma.categories.findUnique({
      where: {
        id: +id,
      },
    });

    if (!categories) {
      throw new CustomAPIError(`No Category with id ${id} was found`, 404);
    }

    return categories;
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
    const { name } = params;
    const categories = await prisma.categories.create({
      data: {
        name,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`Error creating category: ${error.message}`, 500);
  }
};

const update = async (pathParams, params) => {
  try {
    const { id } = pathParams;
    const { name } = params;

    if (!id || !name) {
      throw new CustomAPIError(
        "Please provide all of the required fields",
        400
      );
    }

    const updatedCategory = await prisma.categories.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });
    return updatedCategory;
  } catch (error) {
    console.log(error);
    throw new CustomAPIError(`${error.message}`, error.statusCode || 500);
  }
};

const destroy = async (params) => {
  try {
    const { id } = params;
    const categories = await prisma.categories.delete({
      where: {
        id: +id,
      },
    });
    return categories;
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
