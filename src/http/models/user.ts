import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: "Country",
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            miniLenght: 6,
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
            required: true,
        },
        email_verified_at: {
            type: Date,
            default: null,
        },
        phone_verified_at: {
            type: Date,
            default: null,
        },
        password_reset: {
            type: String,
            required: false,
        },
    },
    {
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
    }
);

userSchema.static("isEmailTaken", async function (payload) {
    const user = await this.findOne(payload);
    return !!user;
});

const User = mongoose.model("users", userSchema);

export default User;
