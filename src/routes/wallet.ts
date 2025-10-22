import express from "express";
import WalletController from "@/http/controllers/wallet.controller";
import HeaderMiddleWare from "@/middleware/header.middleware";
const router = express.Router();

router.post(
    "/create-wallet",
    HeaderMiddleWare.check,
    WalletController.createWallet
);
router.post(
    "/get-balance",
    HeaderMiddleWare.check,
    WalletController.getBalance
);
router.post("/send-token", HeaderMiddleWare.check, WalletController.sendToken);
export default router;
