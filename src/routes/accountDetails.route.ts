import { Router } from "express";
import { Routes } from "@interfaces/routes.interface";
import { AccountDetailsController } from "@/controllers/accountDetails.controller";

class AccountDetailsRoute implements Routes {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}account-details`,
      AccountDetailsController.accountDetails
    );
  }
}

export default AccountDetailsRoute;
