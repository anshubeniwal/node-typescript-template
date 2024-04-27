import knex, { Knex } from "knex";
import { config } from "@/config.server";
import { logger } from "@utils/logger";

export async function create() {
  const db: Knex = knex({
    client: "mysql2",
    connection: config.databaseUrlSql,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "migrations",
    },
    // acquireConnectionTimeout: 2000,
  });

  // Verify the connection before proceeding
  try {
    await db.raw("SELECT now()");
    return db;
  } catch (error) {
    logger.error(error);
    throw new Error(
      "Unable to connect to mysql via Knex. Ensure a valid connection."
    );
  }
}
let dbConnection: Knex = null;

(async () => {
  create()
    .then(async (knexInstance) => {
      await knexInstance.raw("SELECT now()");
      dbConnection = knexInstance;
      logger.info("Mysql connected via knex");
    })
    .catch((error) => {
      logger.error(error);
      throw new Error(
        "Unable to connect to mysql via Knex. Ensure a valid connection."
      );
    });
})();

export const runQuery = async (sql: string, values?: any[]) => {
  const query = dbConnection;
  const result =
    values && values.length
      ? await query.raw(sql, values)
      : await query.raw(sql);
  if (query) await query;
  return result;
};

export const getKnexInstance = () => dbConnection;
