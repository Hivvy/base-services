import express from "express";
import cors from "@/config/cors";
import MongoDB from "@/config/mongodb";
import dotenv from "dotenv";
import router from "@/routes";
import logger from "@/config/logger";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config();

class Server {
    public database;
    public cors;
    public express;
    public port;

    constructor() {
        this.database = new MongoDB();
        this.cors = cors;
        this.express = express();
        this.port = process.env.PORT || 8800;
    }

    public async start(): Promise<void> {
        try {
            await this.database.connect();
            this.express.use(this.cors);
            this.express.listen(this.port);
            this.express.use(router);
            this.express.use(morgan("tiny"));
            this.express.use(bodyParser.urlencoded({ extended: true }));
            this.express.use(bodyParser.json());

            logger.info("Server Start");
        } catch (error) {
            console.log(error);
        }
    }
}

export default Server;
