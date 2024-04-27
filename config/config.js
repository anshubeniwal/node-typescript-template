import { config } from "@/config.server";

const dbConfig = {
  dialect: "mysql",
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbDatabase,
  host: config.dbHost,
};

export default dbConfig;
