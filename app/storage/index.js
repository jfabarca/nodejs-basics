const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var database;

module.exports = {
  connect: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/demo', (err, db) => {
      if(err) {
        return console.log('Error: ' + err);
      }

      database = db;
      console.log('Connected to database.');
      cb();
    });
  }
};
