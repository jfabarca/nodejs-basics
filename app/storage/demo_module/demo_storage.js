const ObjectID = require('mongodb').ObjectID;

module.exports = (storage, db) => {

  var demoStorage = {
    list: () => {
      var cursor = db.collection();
      // Use db object to get data from MongoDB
      return [];
    }
  }

  storage.demoStorage = demoStorage;
};
