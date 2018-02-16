const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

let filename = process.env.MORGAN_FILENAME || 'access.log';
let logDirectory = path.join(__dirname, `../../${process.env.LOGGER_DIRECTORY || 'logs'}`);

let accessLogStream = rfs(filename, {
  interval: '1d',
  path: logDirectory
});

module.exports = morgan(process.env.MORGAN_LOGGER || 'common', { stream: accessLogStream });
