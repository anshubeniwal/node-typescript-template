import IndexRoute from "@routes/index.route";
import ReportSummaryRoute from "@routes/reportSummary.route";
import ViewImpactRoute from "@routes/viewImpact.route";
import AccountDetailsRoute from "@routes/accountDetails.route";

export const routes = [
  new IndexRoute(),
  new ReportSummaryRoute(),
  new ViewImpactRoute(),
  new AccountDetailsRoute(),
];
