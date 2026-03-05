import express from "express";
import { createTask, getTasks, getTaskById, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

// POST /api/tasks
// router.post("/", async (req, res) => {
//   // - Create task
//   // - Attach owner = req.user._id
// });
router.post("/", authMiddleware, createTask);

// // GET /api/tasks
// router.get("/", async (req, res) => {
//   // - Return only tasks belonging to req.user
// });
router.get("/", authMiddleware, getTasks);
// // DELETE /api/tasks/:id
// router.delete("/:id", async (req, res) => {
//   // - Check ownership
//   // - Delete task
// });
router.delete("/:id", authMiddleware, deleteTask);

export default router;