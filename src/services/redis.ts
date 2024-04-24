import { redis } from "@/queues";

const getValue = (key: string) => {
  return redis.get(key);
};

const setValue = async (key: string, value: any, expireIn: number) => {
  const args = [key, value];
  if (expireIn && expireIn > -1) {
    args.push("EX", expireIn);
  }

  const response = await redis.set.call(redis, ...args);
  return response === "OK";
};

export const redisService = {
  getValue,
  setValue,
};
