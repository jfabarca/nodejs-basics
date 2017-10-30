const demoRoutes = require('./demo_module/demo_routes.js');

module.exports = function(app, db) {
  demoRoutes(app, db.demoStorage);
  // Other route groups could go here, in the future
};
