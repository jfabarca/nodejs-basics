module.exports = {
  port: process.env.PORT,
  db: {
    connection: process.env.DATABASE_URL
  },
  logger: {
    directory: process.env.LOGGER_DIRECTORY || 'logs',
    winston: {
      level: process.env.WINSTON_LEVEL || 'info',
      filename: process.env.WINSTON_FILENAME || 'app.log'
    },
    morgan: {
      filename: process.env.MORGAN_FILENAME || 'access.log',
      format: process.env.MORGAN_FORMAT || 'common',
      interval: process.env.MORGAN_INTERVAL || '1d'
    }
  }
};
