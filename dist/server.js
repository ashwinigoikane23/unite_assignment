"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const PORT = process.env.PORT || 4000;
async function main() {
    const app = await (0, app_1.createApp)();
    app.listen(PORT, () => console.log(`Server listening ${PORT}`));
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map