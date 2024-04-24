import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import { ViewImpactController } from "@/controllers/viewImpact.controller";

class ViewImpactRoute implements Routes {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}view-impact`, ViewImpactController.viewImpact);
  }
}

export default ViewImpactRoute;
