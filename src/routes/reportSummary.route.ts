import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import { ReportController } from "@/controllers/reportSummary.controller";

class ReportSummaryRoute implements Routes {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}report-summary`,
      ReportController.reportSummary
    );
  }
}

export default ReportSummaryRoute;
