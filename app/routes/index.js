const logger = require('winston');
const database = require('./database.js');

const demoRoutes = require('./demo_module/demo_routes.js');

module.exports = (app, cb) => {

  database.connect((db) => {
    demoRoutes(app, db);
    // Other route groups could go here, in the future

    // Notify that the app is ready
    cb();
  });

};
