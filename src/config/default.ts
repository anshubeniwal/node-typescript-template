import { IConfigApp } from '@config/constraint';

const config: IConfigApp = {
  port: 4000,
  logDir: '../logs',
  origin: '*',
  credentials: true,
  redisUrl: 'redis://localhost:6379',
  appKey: '',
 
};

export default config;
