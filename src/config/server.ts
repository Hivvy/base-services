import express from "express";
import cors from "@/config/cors";
import MongoDB from "@/config/mongodb";
import dotenv from "dotenv";
import router from "@/routes";
import logger from "@/config/logger";
import morgan from "morgan";
import WebSocketListener from "@/services/websocket";

dotenv.config();

class Server {
    public database;
    public cors;
    public app;
    public port;

    constructor() {
        this.database = new MongoDB();
        this.cors = cors;
        this.app = express();
        this.port = process.env.PORT || 8800;
    }

    public async start(): Promise<void> {
        try {
            // await this.database.connect();
            this.app.use(this.cors);
            this.app.use(morgan("tiny"));
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use(express.json());
            this.app.use("/v1", router);

            this.app.listen(this.port, () => {
                logger.info("Server Start");
            });

            const listener = new WebSocketListener(
                "wss://base-sepolia.g.alchemy.com/v2/gwD__x-Lc4m7lYw1CJxwxDk6tlXwhm2J",
                "0x036CbD53842c5426634e7929541eC2318f3dCF7e"
            );
            listener.connect().catch((error: any) => {
                console.error("Error connecting to WebSocket:", error);
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Server();
