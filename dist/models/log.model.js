"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LogSchema = new mongoose_1.default.Schema({
    type: String,
    payload: mongoose_1.default.Schema.Types.Mixed,
    meta: mongoose_1.default.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now },
});
exports.Log = mongoose_1.default.model("Log", LogSchema);
//# sourceMappingURL=log.model.js.map