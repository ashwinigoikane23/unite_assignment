"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("../controllers/tasks.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const r = (0, express_1.Router)();
r.post("/", auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)(["admin", "manager"]), tasks_controller_1.createCallTask);
r.post("/:id/complete", auth_middleware_1.authMiddleware, (0, auth_middleware_1.requireRole)(["admin", "manager", "agent"]), tasks_controller_1.completeCallTask);
exports.default = r;
//# sourceMappingURL=tasks.route.js.map