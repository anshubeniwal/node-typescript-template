import { connect, set } from 'mongoose';
import { config } from '@/config.server';
import { logger } from '@utils/logger';

const dbConfig = {
  url: config.databaseUrlMongo,
};

export default function dbConnection() {
  if (config.nodeEnv !== 'production') {
    set('debug', true);
  }
  connect(dbConfig.url)
    .then(() => {
      logger.info('Mongo connected');
    })
    .catch(err => {
      logger.error(err);
      process.exit(-1);
    });
}
