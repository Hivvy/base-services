import { NextFunction, Request, Response } from "express";


class HeaderMiddleware {
    constructor() {}

    async check(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const appIdHeader = req.headers["x-hivvy-app-id"];
            const appIdEnv = process.env.HIVVY_APP_ID;

            if (!appIdHeader) {
                throw new Error("x-hivvy-app-id header is missing");
            }

            if (appIdHeader !== appIdEnv) {
                throw new Error("Invalid x-hivvy-app-id");
            }
            next();
        } catch (error: any) {
            res.status(401).send({
                message: error?.message,
            });
        }
    }
}

export default new HeaderMiddleware();
