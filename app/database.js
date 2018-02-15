const logger = require('winston');
const MongoClient = require('mongodb').MongoClient;

let host = process.env.DB_HOST;
let port = process.env.DB_PORT;
let dbName = process.env.DB_NAME;

let database;

module.exports.connect = (cb) => {
  var url = `mongodb://${host}:${port}/${dbName}`;

  MongoClient.connect(url, (err, db) => {

    if(err) return logger.error(`Database connection error: ${err}`);

    database = db;
    logger.info('Connected to database.');

    cb(database);
  });

};
