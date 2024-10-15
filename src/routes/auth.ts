import AuthController from "@/http/controllers/auth.controller";
import LoginRequest from "@/http/request/auth/login.request";
import express from "express";
const router = express.Router();

router.get("/login", LoginRequest.validate, AuthController.login);

export default router;
