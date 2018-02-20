const { format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const winston = require('winston');
const config = require('../../config');

const env = process.env.NODE_ENV || 'development';

const customFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${info.message}`;
});

const loggerPath = config.logger.directory +'/'+ config.logger.winston.filename;
const loggerLevel = config.logger.winston.level;

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
    // Write all logs to file path
    new transports.File({ filename: loggerPath }),
    new transports.Console({ format: combine( label({ label: 'console' }), timestamp(), customFormat ) })
  ],
  exceptionHandlers: [
    new transports.File({ filename: loggerPath }),
    new transports.Console({ format: combine( label({ label: 'console' }), timestamp(), customFormat ) })
  ]
});

module.exports = winston;
