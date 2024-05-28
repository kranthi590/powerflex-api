import express, { Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import Logger from "./utils/logger";
import rateLimiter from "./middlewares/ratelimit";
import { closeConnection, initSqlConnection } from "./db/connection";
import swaggerDocument from "./swagger.json";
//For env File
dotenv.config();

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app: Application = express();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json());
app.use(rateLimiter()); //  apply to all requests
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const init = async () => {
  if (await initSqlConnection()) {
    const { checkAndInsertData } = require("./db/master.data");
    const { registerRoutes } = require("./routes");
    await checkAndInsertData();
    registerRoutes(app);
    app.listen(port, () => Logger.info(`Started server on port ${port}`));
  } else {
    process.exit(1);
  }
};

process
  .on("unhandledRejection", (reason, p) => {
    Logger.error(`${reason} Unhandled Rejection at Promise`, p);
  })
  .on("uncaughtException", async (err) => {
    Logger.error("Uncaught Exception thrown", err);
    await closeConnection();
    process.exit(1);
  });

export default init();
