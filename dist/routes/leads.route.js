"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leads_controller_1 = require("../controllers/leads.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const r = (0, express_1.Router)();
r.post("/", auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)(["admin", "manager", "agent"]), leads_controller_1.createLead);
r.get("/", auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)(["admin", "manager"]), leads_controller_1.listLeads);
r.get("/:id", auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)(["admin", "manager", "agent"]), leads_controller_1.getLead);
exports.default = r;
//# sourceMappingURL=leads.route.js.map