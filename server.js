var env = `${ process.env.NODE_ENV || 'dev' }.env`;
require('dotenv').config({
  path: `./config/${ env }`
});

const logger = require('./app/logger/');
logger.debug('Hello world');
logger.info('INFO Hello world');

const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./app/storage/');

const app = express();
const port = process.env.PORT;

// Parse JSON body and store result in req.body
app.use(bodyParser.urlencoded({ extended: true }));

console.log(`Loaded ${env}`);
// Connect to MongoDB
storage.connect((db) => {
  // Load API routes
  require('./app/routes/')(app, db);
  // Start server
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
});
