// Load application properties
var env = `${ process.env.NODE_ENV || 'dev' }.env`;
require('dotenv').config({
  path: `./config/${ env }`
});

// Setup logger
const logger = require('./app/logger/');

logger.info('Starting NodeJS App.');
logger.info(`Using ${env} properties.`);

const express = require('express');
const bodyParser = require('body-parser');
// const storage = require('./app/storage/');

const app = express();
const port = process.env.PORT;

// Parse JSON body and store result in req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database, then load API routes
require('./app/routes/')(app, () => {
  // Start server
  app.listen(port, () => {
    logger.info(`Listening on port ${port}.`);
  });
});
