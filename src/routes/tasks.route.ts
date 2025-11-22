import { Router } from "express";
import {
  createCallTask,
  completeCallTask,
} from "../controllers/tasks.controller";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";
const r = Router();
r.post("/", authMiddleware, requireRole(["admin", "manager"]), createCallTask);
r.post(
  "/:id/complete",
  authMiddleware,
  requireRole(["admin", "manager", "agent"]),
  completeCallTask
);
export default r;
