var MongoClient = require('mongodb').MongoClient;

var FaveNewsQuery = function(){
  this.url = 'mongodb://localhost:27017/beam_us_up';
};

FaveNewsQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('faveNews');
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },

  send: function(faveNewsInput){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('faveNews');
      collection.insert([
      faveNewsInput
      ]
    );
  });
  },

  delete: function(title){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('faveNews');
      collection.remove(title);
    });
  }
};

module.exports = FaveNewsQuery;