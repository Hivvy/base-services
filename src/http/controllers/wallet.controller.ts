import { Request, Response } from "express";
import Controller from ".";
import WalletRepository, {
    WalletRepositoryInterface,
} from "../repository/wallet";

class WalletContoller extends Controller {
    private walletRepository: WalletRepositoryInterface;
    constructor() {
        super();
        this.walletRepository = WalletRepository;
        this.createWallet = this.createWallet.bind(this);
        this.getBalance = this.getBalance.bind(this);
    }

    async createWallet(req: Request, res: Response) {
        try {
            const response = await this.walletRepository.createWallet();
            return this.handleResponse(
                res,
                "Sucessfully created wallet",
                response
            );
        } catch (error: any) {
            return this.handleErrorResponse(res, error.message);
        }
    }

    async getBalance(req: Request, res: Response) {
        try {
            const response = await this.walletRepository.getBalance(
                req.body.address
            );
            return this.handleResponse(
                res,
                "Sucessfully get balance",
                response
            );
        } catch (error: any) {
            return this.handleErrorResponse(res, error.message);
        }
    }

    async sendToken(req: Request, res: Response) {
        try {
            const response = await this.walletRepository.sendToken(
                req.body.paraphrase,
                req.body.recipientAddress,
                req.body.amount
            );
            return this.handleResponse(res, "Sucessfully sent token", response);
        } catch (error: any) {
            return this.handleErrorResponse(res, error.message);
        }
    }
}

export default new WalletContoller();
