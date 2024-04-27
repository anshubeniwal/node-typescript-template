import { Sequelize } from "sequelize";
import dbConfigs from "./config.js";

const options: any = dbConfigs;
export const db = new Sequelize(
  dbConfigs.database,
  dbConfigs.username,
  dbConfigs.password,
  { host: dbConfigs.host, ...options }
);
