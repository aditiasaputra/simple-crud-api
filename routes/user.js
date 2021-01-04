const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateAuth = require("../middlewares/validateAuth");

const auth = [validateAuth.isAuthenticated, validateAuth.isAdmin];

router.get("/", validateAuth.isAuthenticated, userController.getUsers);
router.get("/:id", validateAuth.isAuthenticated, userController.getUserById);
router.put("/:id", auth, userController.update);
router.delete("/:id", auth, userController.destroy);
router.post("/", auth, userController.store);

module.exports = router;
