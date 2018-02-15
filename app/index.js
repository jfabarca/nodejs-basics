const logger = require('winston');
const database = require('./database.js');

const path = require('path');
const fs = require('fs');

// const demoRoutes = require('./demo_module/demo_routes.js');

module.exports = (app, cb) => {

  database.connect((db) => {

    let dir = path.join(__dirname, '/routes/');

    fs.readdir(dir, (err, files) => {

      if(err) return logger.error(`Error loading routes: ${error.message}`);

      for(let route of files) {
        require(`./routes/${route}`)(app, db);
      }

      logger.info(`Loaded ${files.length} route(s).`);

      // Notify that the app is ready
      cb();
    });
  });
};
