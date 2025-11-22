"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const authMiddleware = async (req, res, next) => {
    const a = req.headers.authorization;
    if (!a)
        return res.status(401).json({ message: "Missing auth" });
    const parts = a.split(" ");
    if (parts.length !== 2)
        return res.status(401).json({ message: "Invalid auth header" });
    const token = parts[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const user = await user_model_1.User.findById(payload.sub).lean();
        if (!user)
            return res.status(401).json({ message: "User not found" });
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
const requireRole = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).send({ message: "Unauthorized" });
        if (!roles.includes(user.role))
            return res.status(403).send({ message: "Forbidden" });
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.middleware.js.map