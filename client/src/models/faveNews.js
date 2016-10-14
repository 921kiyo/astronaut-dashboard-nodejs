var NewsItem = require('./newsItem');
var Ajax = require('./ajax');

var FaveNews = function(){};

FaveNews.prototype = {
  all: function(callback){
    var ajax = new Ajax();
    var self = this;
    ajax.makeGetRequest('http://localhost:3000/api/favenews', function(){
      if (this.status != 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      var faveNews = self.populateFaveNews(results);
      callback(faveNews);
    });
  },
  populateFaveNews: function(results){
    var faveNews = [];

    for (var result of results){
      
      var newsItem = new NewsItem(result);
      faveNews.push(newsItem);
    }
    faveNews1 = faveNews.reverse();
    return faveNews1;
  },

  addNewsItem: function(item){
    var ajax = new Ajax();
    console.log("Item" + item.title);
    ajax.makePostRequest("http://localhost:3000/api/favenews", item);
  },

  deleteNewsItem: function(title){
    var ajax = new Ajax();
    ajax.makeDeleteRequest("http://localhost:3000/api/favenews", title);
  }
};

module.exports = FaveNews;