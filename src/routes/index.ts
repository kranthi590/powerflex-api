import { Application, Request, Response } from "express";
import FactoryRoutes from "./factory.routes";
import SpRocketsRoutes from "./sprockets.routes";

function registerRoutes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
  });

  // server Health Check
  app.get("/health-check", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is up and running!" });
  });

  app.use("/api/v1/factories", FactoryRoutes);
  app.use("/api/v1/sprockets", SpRocketsRoutes);
}

export { registerRoutes };
