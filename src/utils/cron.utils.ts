import { CronJob } from 'cron';

export function createJob(cronTime: string, callback: () => void) {
  const job = new CronJob(cronTime, callback, null, true, 'Etc/UTC');
  job.start();
  return job;
}

export function stopJob(job: CronJob) {
  job.stop();
}
