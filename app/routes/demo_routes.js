module.exports = function(app, db) {

  app.get('/', (req, res) => {
    res.send('GET /');
  });

  app.get('/demo', (req, res) => {
    res.send('GET demo/');
  });

};
