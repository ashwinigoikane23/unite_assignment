"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const leads_route_1 = __importDefault(require("./routes/leads.route"));
const tasks_route_1 = __importDefault(require("./routes/tasks.route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/unite";
    await mongoose_1.default.connect(MONGO);
    app.use("/auth", auth_route_1.default);
    app.use("/leads", leads_route_1.default);
    app.use("/tasks", tasks_route_1.default);
    app.get("/health", (req, res) => res.json({ ok: true }));
    return app;
}
//# sourceMappingURL=app.js.map