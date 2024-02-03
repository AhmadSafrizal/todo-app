const controllers = require("../controllers/user.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/:id", verifyTokenUser, controllers.getUserById);
router.post("/login", controllers.loginUser);
router.post("/register", controllers.registerUser);
router.put("/:id", verifyTokenUser, controllers.updateUser);
router.delete("/:id", verifyTokenUser, controllers.deleteUser);

module.exports = router;
