const fs = require('fs');
const path = require('path');

if(process.env.NODE_ENV !== 'production') {
  // Setup environment variables for local development
  require('dotenv').config();
}

// setup log directory
let logDirectory = path.basename(process.env.LOGGER_DIRECTORY || 'logs');
if( !fs.existsSync(logDirectory) ) fs.mkdirSync(logDirectory);


const morgan = require('./app/logger/morgan');
const logger = require('./app/logger/winston');

logger.info('Starting NodeJS App...');

const express = require('express');

const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

// Setup helmet security
app.use(helmet());

// Parse JSON body and store result in req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Setup morgan logger
app.use(morgan);

// Connect to database, then load API routes
require('./app/')(app, () => {
  // Start server
  app.listen(port, () => {
    logger.info(`Listening on port ${port}.`);
    logger.info(`***  NodeJS App is up and running! ***`);
  });
});
