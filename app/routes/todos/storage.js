const logger = require('winston');
const ObjectID = require('mongodb').ObjectID;

module.exports = db => {
  return {

    getTodos: (cb) => {
      let cursor = db.collection('todo').find();
      cursor.toArray((err, todos) => {
        if(err) {
          logger.error(err);
          return cb(err, todos);
        }

        logger.silly(`TODO getAll retrieved ${todos.length} record(s)`);
        cb(err, todos);
      });
    },

    createTodo: (todo, cb) => {
      todo.done = false;
      todo.dateCreated = new Date();
      db.collection('todo').insertOne(todo, (err, result) => {
        if(err) {
          logger.error(err);
          return cb(err, result);
        }

        logger.silly('TODO insertOne: '+ result);
        cb(null, result.ops[0]);
      });
    },

    updateTodo: (todoId, text, cb) => {
      db.collection('todo').updateOne({
        _id: new ObjectID(todoId)
      }, {
        $set: {text: text}
      }, (err, result) => {
        if(err) {
          logger.error(err);
          return cb(err, result);
        }

        logger.silly('TODO updateOne: '+ result);
        db.collection('todo').findOne({
          _id: new ObjectID(todoId)
        }, cb);
      });
    },

    toggleTodoDone: (todoId, cb) => {

      db.collection('todo').findOne({
        _id: new ObjectID(todoId)
      }, (err, doc) => {
        if(err) {
          logger.error(err);
          return cb(err, doc);
        }

        db.collection('todo').updateOne({
          _id: new ObjectID(todoId)
        }, {
          $set: {done: !doc.done}
        }, (err, result) => {
          logger.silly('TODO toggleDone'+ result);
          cb(err, result);
        });
      });
    },

    deleteTodo: (todoId, cb) => {
      db.collection('todo').deleteOne({
        _id: new ObjectID(todoId)
      }, (err, result) => {
        if(err) {
          logger.error(err);
          return cb(err, result);
        }

        logger.silly('TODO deleteOne: '+ result);
        cb(err, result);
      });
    }
  };
};
