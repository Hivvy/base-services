"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const __1 = __importDefault(require(".."));
class LoginRequest extends __1.default {
    constructor() {
        const schema = joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
        });
        super(schema);
    }
}
exports.default = new LoginRequest();
