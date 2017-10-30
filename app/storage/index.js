const MongoClient = require('mongodb').MongoClient;

const demoStorage = require('./demo_module/demo_storage.js');

var database;
var storage = {};

module.exports.connect = function(cb) {

  MongoClient.connect('mongodb://localhost:27017/demo', (err, db) => {
    if(err) {
      return console.log('Error: ' + err);
    }

    database = db;
    console.log('Connected to database.');

    demoStorage(storage, database);
    // Other storage groups could go here, in the future

    cb(storage);
  });

};
