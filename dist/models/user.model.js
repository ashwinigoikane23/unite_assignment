"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    phone: String,
    role: { type: String, enum: ["admin", "manager", "agent"], default: "agent" },
    createdAt: { type: Date, default: Date.now },
});
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map