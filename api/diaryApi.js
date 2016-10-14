var DiaryQuery = require('../db/diaryQuery');

var DiaryApi = function(app) {
  var query = new DiaryQuery();
  
  app.get('/api/diary', function(req, res) {
    query.all(function(results){
      res.json(results);
    });
  });

  app.post('/api/diary', function(req, res) {
    query.send(req.body.entry);
  });

  app.delete('/api/diary', function(req, res){
    console.log(req.body);
    query.delete(req.body);
  });
};

module.exports = DiaryApi;