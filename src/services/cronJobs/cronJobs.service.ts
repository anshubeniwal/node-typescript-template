import { createJob } from "@utils/cron.utils";

class CronJobService {
  constructor() {
    this.dummyJob();
  }
  private dummyJob() {
    // TODO: correct cron expressions
    // runs at every 30th minutes
    createJob("*/1 * * * *", () => {});
  }
}

export default CronJobService;
