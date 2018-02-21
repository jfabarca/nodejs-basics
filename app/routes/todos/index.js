const logger = require('winston');

module.exports = (app, db) => {

  const storage = require('./storage')(db);

  // Retrieves all records
  app.get('/todos', (req, res) => {
    storage.getTodos((err, todos) => {
      if(err) return res.status(500).send(err);

      res.send(todos);
    });
  });

  // Inserts a new record
  app.post('/todos', (req, res) => {
    let todo = {
      text: req.body.text
    };
    storage.createTodo(todo, (err, result) => {
      if(err) return res.status(500).send(err);

      res.send(result);
    });
  });

  // Updates an existing record
  app.put('/todos/:todoid', (req, res) => {
    storage.updateTodo(req.params.todoid, req.body.text,
      (err, todo) => {
        if(err) return res.status(500).send(err);

        res.send(todo);
      }
    );
  });

  // Toggles a record's done attribute to true/false
  app.put('/todos/:todoid/toggle', (req, res) => {
    storage.toggleTodoDone(req.params.todoid, (err, result) => {
      if(err) return res.status(500).send(err);

      // res.send(result);
      res.sendStatus(200);
    });
  });

  // Deletes an existing record
  app.delete('/todos/:todoid', (req, res) => {
    storage.deleteTodo(req.params.todoid, (err, result) => {
      if(err) return res.status(500).send(err);
      res.sendStatus(200);
    });
  });

};
