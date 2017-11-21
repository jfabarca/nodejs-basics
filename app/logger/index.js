const { format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const winston = require('winston');

const env = process.env.NODE_ENV || 'dev';

const customFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${info.message}`;
});

const loggerPath = process.env.LOGGER_PATH;
const loggerLevel = process.env.LOGGER_LEVEL;

  winston.configure({
    level: loggerLevel,
    format: combine(
      label({ label: env }),
      timestamp(),
      customFormat
    ),
    transports: [
      // Write all logs error (and below) to 'error.log'
      // new transports.File({ filename: 'app_error.log', level: 'error' }),
      // Write to all logs with level 'info' and below to file
      new transports.File({ filename: loggerPath}),
      new transports.Console({ format: combine( label({ label: 'console' }), timestamp(), customFormat ) })
    ],
    exceptionHandlers: [
      new transports.File({ filename: loggerPath})
    ]
  });

module.exports = winston;
