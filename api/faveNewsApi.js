var FaveNewsQuery = require('../db/faveNewsQuery');

var FaveNewsApi = function(app) {
  var query = new FaveNewsQuery();
  
  app.get('/api/favenews', function(req, res) {
    query.all(function(results){
      res.json(results);
    });
  });

  app.post('/api/favenews', function(req, res) {
    // var string = JSON.parse(req.body.entry)
    // console.log("req" + req);
    // console.log("res" + res);
    console.log(req.body);
    query.send(req.body);
  });

  app.delete('/api/favenews', function(req, res){
    console.log(req.body);
    query.delete(req.body);
  });
};

module.exports = FaveNewsApi;