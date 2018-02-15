const { format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

const customFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${info.message}`;
});

let defaultPath = './logs/app.log';
let defaultLevel = 'silly';

let isPathDeclared = !!process.env.LOGGER_PATH;
let isLevelDeclared = !!process.env.LOGGER_LEVEL;

const loggerPath = process.env.LOGGER_PATH || defaultPath;
const loggerLevel = process.env.LOGGER_LEVEL || defaultLevel;

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
    // Write to all logs to file path
    new transports.File({ filename: loggerPath}),
    new transports.Console({ format: combine( label({ label: 'console' }), timestamp(), customFormat ) })
  ],
  exceptionHandlers: [
    new transports.Console({ format: combine( label({ label: 'console' }), timestamp(), customFormat ) })
  ]
});

if(!isPathDeclared) {
  winston.info(`LOGGER_PATH env var not found, using default value "${defaultPath}" instead.`);
}
if(!isLevelDeclared) {
  winston.info(`LOGGER_LEVEL env var not found, using default value "${defaultLevel}" instead.`);
}

module.exports = winston;
