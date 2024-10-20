"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("@/http/controllers/auth.controller"));
const login_request_1 = __importDefault(require("@/http/request/auth/login.request"));
const otp_request_1 = __importDefault(require("@/http/request/auth/otp.request"));
const register_request_1 = __importDefault(require("@/http/request/auth/register.request"));
const verify_request_1 = __importDefault(require("@/http/request/auth/verify.request"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/login", login_request_1.default.validate, auth_controller_1.default.login);
router.post("/register", register_request_1.default.validate, auth_controller_1.default.register);
router.post("/otp/send", otp_request_1.default.validate, auth_controller_1.default.resendOtp);
router.post("/otp/verify", verify_request_1.default.validate, auth_controller_1.default.verifyOtp);
exports.default = router;
