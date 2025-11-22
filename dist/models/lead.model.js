"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LeadSchema = new mongoose_1.default.Schema({
    name: String,
    phone: { type: String, required: true },
    email: String,
    status: { type: String, default: "new" },
    source: String,
    assigned_to: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    s3ImageKey: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
});
LeadSchema.index({ phone: 1 }, { unique: true, partialFilterExpression: { phone: { $exists: true } } });
exports.Lead = mongoose_1.default.model("Lead", LeadSchema);
//# sourceMappingURL=lead.model.js.map