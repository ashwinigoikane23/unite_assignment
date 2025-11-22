import { Router } from "express";
import {
  createLead,
  listLeads,
  getLead,
} from "../controllers/leads.controller";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";
const r = Router();
r.post(
  "/",
  authMiddleware,
  requireRole(["admin", "manager", "agent"]),
  createLead
);
r.get("/", authMiddleware, requireRole(["admin", "manager"]), listLeads);
r.get(
  "/:id",
  authMiddleware,
  requireRole(["admin", "manager", "agent"]),
  getLead
);
export default r;
