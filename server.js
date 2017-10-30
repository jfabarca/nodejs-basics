const express = require('express');
const bodyParser = require('body-parser');
const storage = require('./app/storage/');
const config = require('./config/config');

const app = express();
const port = config.port;

// Parse JSON body and store result in req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
storage.connect((db) => {
  // Load API routes
  require('./app/routes/')(app, db);
  // Start server
  app.listen(port, () => {
    console.log('Listening on port ' + port);
  });
});
