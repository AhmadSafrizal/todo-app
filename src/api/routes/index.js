const router = require("express").Router();

const crudCategory = require("./category.route");
const crudUser = require("./user.route");
const crudTask = require("./task.route");

router.use("/api/task", crudTask);
router.use("/api/category", crudCategory);
router.use("/api/user", crudUser);

module.exports = router;
