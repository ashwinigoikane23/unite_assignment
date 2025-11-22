"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET ?? "dev_secret";
function parseExpiresIn(raw) {
    if (!raw)
        return undefined;
    // if raw is purely numeric, return number; else return the string form (e.g. "1h", "30m")
    const n = Number(raw);
    if (!Number.isNaN(n) && raw.trim() !== "")
        return n;
    return raw;
}
const JWT_EXPIRES_IN = parseExpiresIn(process.env.JWT_EXPIRES_IN);
const login = async (req, res) => {
    const { email, password } = req.body;
    const u = await user_model_1.User.findOne({ email });
    if (!u)
        return res.status(401).json({ message: "Invalid" });
    const ok = await bcrypt_1.default.compare(password, u.passwordHash || "");
    if (!ok)
        return res.status(401).json({ message: "Invalid" });
    const token = jwt.sign({ sub: String(u._id), role: u.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({
        token,
        user: { id: u._id, email: u.email, name: u.name, role: u.role },
    });
};
exports.login = login;
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const existing = await user_model_1.User.findOne({ email });
    if (existing) {
        return res.status(409).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const u = new user_model_1.User({ name, email, passwordHash, role });
    await u.save();
    res.status(201).json({ id: u._id, email: u.email, name: u.name, role: u.role });
};
exports.register = register;
//# sourceMappingURL=auth.controller.js.map