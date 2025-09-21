const express = require("express");
const {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller.js");
const router = express.Router();

router.get("/", getAllTasks);
router.get("/:taskId", getTaskById);
router.post("/", addTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
