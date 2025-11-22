import { Router } from "express";
import {
  createLead,
  listLeads,
  getLead,
  updateLead,
  deleteLead,
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
r.put(
  "/:id",
  authMiddleware,
  requireRole(["admin", "manager", "agent"]),
  updateLead
);
r.delete("/:id", authMiddleware, requireRole(["admin"]), deleteLead);
export default r;
