const demoRoutes = require('./demo_routes');

module.exports = function(app, db) {
  demoRoutes(app, db);
  // Other route groups could go here, in the future
};
