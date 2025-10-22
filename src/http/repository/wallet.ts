import BaseService from "@/services/base";

export interface WalletRepositoryInterface {
    createWallet(): Promise<{
        address: string;
        paraphrase: string;
        blockchain: string;
    }>;
    getBalance(
        address: string
    ): Promise<{ name: string; balance: string; chainBalance: string }>;
    sendToken(
        paraphrase: string,
        recipientAddress: string,
        amount: string
    ): Promise<any>;
}

class WalletRepository implements WalletRepositoryInterface {
    private baseService: BaseService;

    constructor() {
        this.baseService = new BaseService(
            "https://sepolia.base.org",
            "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
        );
    }
    async createWallet(): Promise<{
        address: string;
        paraphrase: string;
        blockchain: string;
    }> {
        const wallet = await this.baseService.createWallet();
        return {
            address: wallet.address,
            paraphrase: wallet.paraphrase,
            blockchain: wallet.blockchain,
        };
    }

    async getBalance(
        address: string
    ): Promise<{ name: string; balance: string; chainBalance: string }> {
        const balance = await this.baseService.getBalance(address);
        return {
            name: balance.name,
            balance: balance.balance,
            chainBalance: balance.chainBalance,
        };
    }

    async sendToken(
        paraphrase: string,
        recipientAddress: string,
        amount: string
    ): Promise<void> {
        try {
            const transaction = await this.baseService.sendToken(
                paraphrase,
                recipientAddress,
                amount
            );
            return transaction;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default new WalletRepository();
