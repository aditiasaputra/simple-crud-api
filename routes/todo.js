const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const validateTodo = require("../middlewares/validateTodo");
const validateAuth = require("../middlewares/validateAuth");

const auth = [validateAuth.isAuthenticated, validateAuth.isAdmin];

router.get("/", auth, todoController.getTodos);
router.get("/:id", auth, todoController.getTodoById
);
router.put("/:id", auth, validateTodo, todoController.update);
router.delete("/:id", auth, todoController.destroy);
router.post("/", auth, validateTodo, todoController.store);

module.exports = router;
