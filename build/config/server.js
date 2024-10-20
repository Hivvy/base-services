"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("@/config/cors"));
const mongodb_1 = __importDefault(require("@/config/mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("@/routes"));
const logger_1 = __importDefault(require("@/config/logger"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.database = new mongodb_1.default();
        this.cors = cors_1.default;
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 8800;
    }
    async start() {
        try {
            await this.database.connect();
            this.app.use(this.cors);
            this.app.use((0, morgan_1.default)("tiny"));
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use(express_1.default.json());
            this.app.use("/v1", routes_1.default);
            this.app.listen(this.port, () => {
                logger_1.default.info("Server Start");
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new Server();
