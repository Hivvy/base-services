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
dotenv_1.default.config();
class Server {
    constructor() {
        this.database = new mongodb_1.default();
        this.cors = cors_1.default;
        this.express = (0, express_1.default)();
        this.port = process.env.PORT || 8800;
    }
    async start() {
        try {
            await this.database.connect();
            this.express.use(this.cors);
            this.express.listen(this.port);
            this.express.use("v1", routes_1.default);
            logger_1.default.info("Server Start");
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Server;
