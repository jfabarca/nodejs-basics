const logger = require('winston');
const MongoClient = require('mongodb').MongoClient;

var database;

module.exports.connect = (cb) => {
  var url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  MongoClient.connect(url, (err, db) => {
    if(err) {
      return logger.error('Error: ' + err);
    }

    database = db;
    logger.info('Connected to database.');

    cb(database);
  });

};
