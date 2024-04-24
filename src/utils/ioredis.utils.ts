import { config } from "@/config.server";
import Redis from "ioredis";

const redisConn = new Redis(config.redisUrl);

export default redisConn;
