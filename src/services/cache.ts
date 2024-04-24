import { createQueue } from "@/queues/createQueue";

export const testQueue = createQueue({
  name: "test",
  attempts: 5,
  removeOnComplete: true,
  backoff: "exponential",
});
