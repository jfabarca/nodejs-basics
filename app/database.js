const logger = require('winston');
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

let database;

module.exports.connect = (cb) => {
  var url = config.db.connection;

  MongoClient.connect(url, (err, db) => {

    if(err) return logger.error(`Database connection error: ${err}`);

    database = db;
    logger.info('Connected to database.');

    cb(database);
  });

};
