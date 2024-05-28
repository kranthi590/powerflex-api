import { Router } from "express";
import FactoryController from "../controllers/factory.controller";

class FactoryRoutes {
  router = Router();
  factoryController = new FactoryController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:id", this.factoryController.getFactory);
  }
}

export default new FactoryRoutes().router;
