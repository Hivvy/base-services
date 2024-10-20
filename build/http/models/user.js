"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const helpers_1 = require("../helpers");
const otp_1 = __importDefault(require("./otp"));
const otp_mail_1 = __importDefault(require("@/mails/otp.mail"));
const dayjs_1 = __importDefault(require("dayjs"));
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true,
    },
    email_verified_at: {
        type: String,
        default: null,
    },
    phone_verified_at: {
        type: String,
        default: null,
    },
    password_reset: {
        type: String,
        required: false,
    },
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.password_reset;
            delete ret.password;
            return ret;
        },
    },
    timestamps: true,
});
userSchema.static("isEmailTaken", async function (payload) {
    const user = await this.findOne(payload);
    return !!user;
});
userSchema.method("validatePassword", function (password) {
    const hashedPassword = this.password;
    return (0, helpers_1.compareBcryptPassword)(password, hashedPassword);
});
userSchema.method("createOtp", async function () {
    const otp = await otp_1.default.createOtp(this.id);
    new otp_mail_1.default(this.email, otp.code);
});
userSchema.method("createToken", async function () {
    const payload = {
        id: this.id,
    };
    return (0, helpers_1.generateTokenFromPayload)(payload);
});
userSchema.method("validateOtp", async function (code) {
    // Validate the OTP
    await otp_1.default.validateOtp(this.id, code);
    // Check if the email is not verified yet
    if (!this.email_verified_at) {
        // Update the emailVerifiedAt field using updateOne
        await User.updateOne({ _id: this.id }, { email_verified_at: (0, dayjs_1.default)().format() });
    }
});
const User = mongoose_1.default.model("users", userSchema);
exports.default = User;
