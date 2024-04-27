export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export interface IConfigApp {
  port: number;
  nodeEnv?: string;
  appKey: string;
  databaseUrlSql?: string;
  databaseUrlMongo?: string;
  internalAccessToken?: string;
  redisUrl: string;
  appUrl?: string;
  base_url?: string;
  appMode?: number;
  logDir: string;
  origin: string;
  credentials: boolean;
  dbUsername: string;
  dbPassword: string;
  dbDatabase: string;
  dbHost: string;
}
