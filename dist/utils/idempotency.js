"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIdempotency = registerIdempotency;
const log_model_1 = require("../models/log.model");
async function registerIdempotency(key, payload) {
    const exists = await log_model_1.Log.findOne({ type: "idempotency", "meta.key": key });
    if (exists)
        return false;
    await log_model_1.Log.create({ type: "idempotency", meta: { key, payload } });
    return true;
}
//# sourceMappingURL=idempotency.js.map