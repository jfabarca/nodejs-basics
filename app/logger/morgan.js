const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const config = require('../../config');

let directory = config.logger.directory;
let filename = config.logger.morgan.filename;

let accessLogStream = rfs(filename, {
  interval: '1d',
  path: path.join(__dirname, `../../${directory}`)
});

module.exports = morgan(config.logger.morgan.format, { stream: accessLogStream });
