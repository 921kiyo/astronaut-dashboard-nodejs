var Key = require('../client/src/models/keys');
var key = new Key();

var FaveNews = require('../client/src/models/faveNews');
var faveNews = new FaveNews();

var NYTApi = function(){
   
};

NYTApi.prototype = {
  makeRequest: function(keyword, callback){
    var self = this;
    var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+keyword+"&page=2&sort=newest&api-key="+key.nytKey+"";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function(){
      if(this.status !== 200) {
         return;
       }
       json = this.responseText;
       var parsedJson = JSON.parse(json);
       callback(parsedJson);
    };
    request.send();

  }
  
};
module.exports = NYTApi;