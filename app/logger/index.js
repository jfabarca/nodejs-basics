const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

var env = process.env.NODE_ENV || 'dev';

const customFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${info.message}`;
});

let logger;
const productionLog = 'app.log';
const developmentLog = 'debug.log';

if(process.env.NODE_ENV === 'production') {
  logger = createLogger({
    level: 'info',
    // format: format.json(),
    format: combine(
      label({ label: env }),
      timestamp(),
      customFormat
    ),
    transports: [
      // Write all logs error (and below) to 'error.log'
      // new transports.File({ filename: 'app_error.log', level: 'error' }),
      // Write to all logs with level 'info' and below to file
      new transports.File({ filename: productionLog})
    ],
    exceptionHandlers: [
      new transports.File({ filename: productionLog})
    ]
  });

} else {
  // dev, qa, etc
  logger = createLogger({
    level: 'info',
    // format: format.json(),
    format: combine(
      label({ label: env }),
      timestamp(),
      customFormat
    ),
    transports: [
      new transports.File({ filename: developmentLog}),
      new transports.Console({ format: combine( label({ label: 'console' }), timestamp(), customFormat ) })
    ],
    exceptionHandlers: [
      new transports.File({ filename: developmentLog})
    ]
  });
}

module.exports = logger;
