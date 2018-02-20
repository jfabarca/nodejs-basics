// Setup environment variables for local development
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const config = require('./config');

// setup log directory
let logDirectory = path.basename(config.logger.directory);
if( !fs.existsSync(logDirectory) ) fs.mkdirSync(logDirectory);

const morgan = require('./app/logger/morgan');
const logger = require('./app/logger/winston');

logger.info('Starting NodeJS App...');

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

// Setup helmet security
app.use(helmet());

// Parse JSON body and store result in req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Setup morgan logger
app.use(morgan);

// Connect to database, then load API routes
require('./app/')(app, () => {
  // Start server
  app.listen(config.port, () => {
    logger.info(`***  NodeJS App is up and running! Listening on port ${config.port}.***`);
  });
});
