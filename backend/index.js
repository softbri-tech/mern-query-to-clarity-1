import express from 'express';
import Database from "./config/db.js";
import {configDotenv} from "dotenv";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import articleRoutes from "./routes/article.routes.js";

configDotenv();
class Server {
    constructor() {
        this.app = express();
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    async initializeDatabase() {
        await Database.getInstance().connect();
    }

    initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("API is running");
        });

        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/articles", articleRoutes);
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware.handle.bind(errorMiddleware));
    }

    start() {
        const PORT = process.env.PORT || 5000;
        this.app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}

const server = new Server();
server.start();