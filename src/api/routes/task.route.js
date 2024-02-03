const controllers = require("../controllers/task.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/user/:user_id", verifyTokenUser, controllers.getAllTask);
router.get("/:id/user/:user_id", verifyTokenUser, controllers.getOneTask);
router.post("/", verifyTokenUser, controllers.newTask);
router.put("/:id/user/:user_id", verifyTokenUser, controllers.updateTask);
router.delete("/:id/user/:user_id", verifyTokenUser, controllers.deleteTask);

module.exports = router;
