import BaseService from "@/services/base";

type Environment = "production" | "sandbox";

interface NetworkConfig {
    rpcUrl: string;
    contractAddress: string;
}

const NETWORK_CONFIGS: Record<Environment, NetworkConfig> = {
    production: {
        rpcUrl: "https://mainnet.base.org",
        contractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base Mainnet
    },
    sandbox: {
        rpcUrl: "https://sepolia.base.org",
        contractAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC on Base Sepolia
    },
};

export interface WalletRepositoryInterface {
    createWallet(environment: Environment): Promise<{
        address: string;
        paraphrase: string;
        blockchain: string;
    }>;
    getBalance(
        address: string,
        environment: Environment
    ): Promise<{ name: string; balance: string; chainBalance: string }>;
    sendToken(
        paraphrase: string,
        recipientAddress: string,
        amount: string,
        environment: Environment
    ): Promise<any>;
}

class WalletRepository implements WalletRepositoryInterface {
    private baseServices: Map<Environment, BaseService> = new Map();

    constructor() {
        // Initialize BaseService instances for each environment
        Object.entries(NETWORK_CONFIGS).forEach(([env, config]) => {
            this.baseServices.set(
                env as Environment,
                new BaseService(config.rpcUrl, config.contractAddress)
            );
        });
    }

    private getBaseService(environment: Environment): BaseService {
        const service = this.baseServices.get(environment);
        if (!service) {
            throw new Error(`Unsupported environment: ${environment}`);
        }
        return service;
    }
    async createWallet(environment: Environment): Promise<{
        address: string;
        paraphrase: string;
        blockchain: string;
    }> {
        const baseService = this.getBaseService(environment);
        const wallet = await baseService.createWallet();
        return {
            address: wallet.address,
            paraphrase: wallet.paraphrase,
            blockchain: wallet.blockchain,
        };
    }

    async getBalance(
        address: string,
        environment: Environment
    ): Promise<{ name: string; balance: string; chainBalance: string }> {
        const baseService = this.getBaseService(environment);
        const balance = await baseService.getBalance(address);
        return {
            name: balance.name,
            balance: balance.balance,
            chainBalance: balance.chainBalance,
        };
    }

    async sendToken(
        paraphrase: string,
        recipientAddress: string,
        amount: string,
        environment: Environment
    ): Promise<void> {
        try {
            const baseService = this.getBaseService(environment);
            const transaction = await baseService.sendToken(
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
