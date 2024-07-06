"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("@/config/logger"));
class MongoDB {
    constructor() {
        this.url = process.env.DB_CONNECTION ?? "";
    }
    async connect() {
        try {
            await mongoose_1.default.connect(this.url);
            logger_1.default.info("Database connection successful");
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Connection to MongoDB failed:", error);
            throw new Error("Connection to MongoDB failed");
        }
    }
}
exports.default = MongoDB;
