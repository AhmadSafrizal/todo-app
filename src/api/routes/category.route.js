const controllers = require("../controllers/category.controller");
const { verifyTokenUser } = require("../middlewares/verifyTokenMiddleware");

const router = require("express").Router();
router.get("/", verifyTokenUser, controllers.getAllCategory);
router.get("/:id", verifyTokenUser, controllers.getOneCategory);
router.post("/", verifyTokenUser, controllers.newCategory);
router.put("/:id", verifyTokenUser, controllers.updateCategory);
router.delete("/:id", verifyTokenUser, controllers.deleteCategory);

module.exports = router;
