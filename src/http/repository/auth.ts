interface AuthRepositoryInterface {
    login(request: { email: string; password: string }): void;
    register(request: { email: string; password: string }): void;
    verifyEmail(request: { email: string }): void;
    resetPassword(request: { email: string }): void;
    changePassword(request: { email: string; token: string }): void;
}

class AuthRepository implements AuthRepositoryInterface {
    async login(request: { email: string; password: string }) {}
    async register(request: { email: string; password: string }) {}
    async verifyEmail(request: { email: string }) {}
    async resetPassword(request: { email: string }) {}
    async changePassword(request: { email: string; token: string }) {}
}
