if(process.env.NODE_ENV !== 'production') {
  // Setup environment variables for local development
  require('dotenv').config();
}

// Setup logger
const logger = require('./app/logger');

logger.info('Starting NodeJS App...');

const express = require('express');
const bodyParser = require('body-parser');
// const storage = require('./app/storage/');

const app = express();
const port = process.env.PORT;

// Parse JSON body and store result in req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database, then load API routes
require('./app/')(app, () => {
  // Start server
  app.listen(port, () => {
    logger.info(`Listening on port ${port}.`);
    logger.info(`***  NodeJS App is up and running! ***`);
  });
});
