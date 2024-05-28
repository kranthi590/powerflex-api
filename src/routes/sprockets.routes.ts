import { Router } from "express";

import SpRocketsController from "../controllers/sprockets.controller";
import validateMiddleware from "../middlewares/validate.request";

class SpRocketsRoutes {
  router = Router();
  spRocketsController = new SpRocketsController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:id", this.spRocketsController.getSpRocket);
    this.router.get("/", this.spRocketsController.getAllSpRockets);
    this.router.post(
      "/",
      validateMiddleware,
      this.spRocketsController.createOrUpdateSpRocket,
    );
    this.router.put("/:id", this.spRocketsController.createOrUpdateSpRocket);
  }
}

export default new SpRocketsRoutes().router;
