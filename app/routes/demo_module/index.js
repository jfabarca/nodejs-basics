module.exports = function(app, db) {

  app.get('/', (req, res) => {
    // var list = db.list();
    res.send('GET /');
  });

  app.get('/demo', (req, res) => {
    res.send('GET demo/');
  });

};
