"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallTask = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CallTaskSchema = new mongoose_1.default.Schema({
    lead: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Lead", required: true },
    assigned_to: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    scheduledAt: Date,
    completed: { type: Boolean, default: false },
    notes: [
        {
            text: String,
            createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
            createdAt: Date,
        },
    ],
    outcome: String,
    idempotencyKey: String,
    createdAt: { type: Date, default: Date.now },
});
CallTaskSchema.index({ idempotencyKey: 1 }, { unique: false });
exports.CallTask = mongoose_1.default.model("CallTask", CallTaskSchema);
//# sourceMappingURL=calltask.model.js.map