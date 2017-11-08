const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    // Write to all logs with level 'info' and below to file
    // Write all logs error (and below) to 'error.log'
    new transports.File({ filename: 'app_error.log', level: 'error' }),
    new transports.File({ filename: 'app.log'})
  ]
});

// If we are not in production then log to the console and 'debug.log'
if(process.env.NODE_ENV !== 'production') {
  logger.configure({
    level: 'debug',
    transports: [
      new transports.File({ filename: 'debug.log'}),
      new transports.Console({ format: format.simple() })
    ]
  });
}

module.exports = logger;
